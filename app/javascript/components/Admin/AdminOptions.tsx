import React, { useContext } from "react";
import styled from "styled-components";
import OptionsStore from "../../actions/optionsStore";
import { useMutation } from "react-query";
import useTicketMule from "../../hooks/useTicketMule";
import AdminSection from "./AdminSection";
import { TicketContext } from "../../application";
import SecondaryButton from "../ComponentLibrary/SecondaryButton";
import { FieldStyled } from "../ComponentLibrary/FormComponentsStyled";
import { useForm } from "react-hook-form";
import { createStandardSuccessMessage, createStandardErrorMessage } from "../ComponentLibrary/FlashMessages";
import { capitalizeEachWord } from "../../utils/displayUtils";
import { Error } from "../ComponentLibrary/FormComponentsStyled";
import { getPlural, queryClient } from "../../utils/network";
import ResourceStore from "../../actions/resourceStore";
import {OptionType, OptionTypes, Result} from "../../types/types";
import useGetOptions from "../../hooks/useGetOptions";

const FieldContainer = styled.div`
    display: flex;
    align-items: center;
`;
interface Props {
    type: OptionTypes
}


// eslint-disable-next-line react/display-name
const AdminOptions = React.memo(({type}: Props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { state, dispatch } = useContext(TicketContext);
    const { options } = useGetOptions(false);
    const plural = getPlural(type);
    const label = `${type}`.replace("_", " ");
    const captial = capitalizeEachWord(label);
    const ticketMule = useTicketMule();

    const {mutate: toggleEnableOption} = useMutation(
        ticketMule.toggleEnableOption.bind(this, state, type),
        {
            onSuccess: async (option: OptionType) => {
                const msg = (option.disabled_at) ? 'disabled' : 'enabled';
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`${captial} ${option.name} was successfully ${msg}!`)});
                queryClient.removeQueries("options", { exact: true });
                dispatch({action_fn: OptionsStore.updateOption, type, anOption: option});
                // Query Invalidations
            },
        }
    );

    const { mutate: addTheOption } = useMutation(
        ticketMule.addOption.bind(this, state, type),

        {
            onSuccess: async (option: OptionType) => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`${captial} ${option.name} successfully added!`)});

                queryClient.removeQueries("options", { exact: true });

                dispatch({action_fn: OptionsStore.addOption, type, anOption: option});
                // Query Invalidations
            },
            onError: async (result: Result) => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardErrorMessage(result.response.data.message)});
            }
        }
    );



    const toggleOption = async (option) => {
        const text = (option.disabled_at == null) ? 'disable' : 'enable';
        const msg = (type === "group") ? "Accounting" : "";
        if (window.confirm(`Really ${text} ${msg} ${label} ${option.name}?`)) {
            //useMutation to delete this alert
            await toggleEnableOption(option.id);
        }
    };

    const onSubmit = async (data) =>  {
        const anOption: OptionType = {
            name: data.addOption
        };
        reset();
        // @ts-ignore
        await addTheOption(anOption);

    };

    return (<div>
        {(options && Object.prototype.hasOwnProperty.call(options, plural)) &&
        <>
            <AdminSection optionResources={(options) ? options[plural] : []} isEnabled={true}
                          toggleDisabled={toggleOption}/>
            <AdminSection optionResources={(options) ? options[plural] : []} isEnabled={false}
                          toggleDisabled={toggleOption}/>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldContainer>
                    <FieldStyled width={225} type="text" name="addOption"
                                 {...register("addOption", {required: true})}></FieldStyled>
                    <SecondaryButton type="submit">
                        Add {captial}
                    </SecondaryButton>
                </FieldContainer>
                {(errors.addOption) && <Error>{captial} name is required</Error>}
            </form>
        </>
        }

    </div>);
});

export default AdminOptions;