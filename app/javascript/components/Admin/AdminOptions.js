import React, { useContext } from "react";
import styled from "styled-components";
import OptionsStore from "../../actions/optionsStore";
import { queryCache, useMutation } from "react-query";
import useTicketMule from "../../hooks/useTicketMule";
import AdminSection from "./AdminSection";
import { TicketContext } from "../../packs/application";
import SecondaryButton from "../ComponentLibrary/SecondaryButton";
import FieldStyled from "../ComponentLibrary/FieldStyled";
import { useForm } from "react-hook-form";
import { ErrorNotificationStyled, SuccessNotificationStyled } from "../ComponentLibrary/FlashMessages";
import { PropTypes } from "prop-types";
import { capitalizeEachWord } from "../../utils/displayUtils";
import { getPlural } from "../../utils/network";

const FieldContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Error = styled.div`
    color: red;
`;

// eslint-disable-next-line react/display-name
const AdminOptions = React.memo(({setFlashMsg, type}) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const { state, dispatch } = useContext(TicketContext);
    const plural = getPlural(type);
    const label = type.replaceAll("_", " ");
    const captial = capitalizeEachWord(label);
    const ticketMule = useTicketMule();

    const [toggleEnableOption] = useMutation(
        ticketMule.toggleEnableOption.bind(this, state, type),
        {
            onSuccess: async (option) => {
                const msg = (option.disabled_at) ? 'disabled' : 'enabled';
                setFlashMsg(<SuccessNotificationStyled> {captial} {option.name} was successfully {msg}! </SuccessNotificationStyled>);
                await queryCache.invalidateQueries("options");
                dispatch({action_fn: OptionsStore.updateOption, type, anOption: option});
                // Query Invalidations
            },
        }
    );

    const [addTheOption] = useMutation(
        ticketMule.addOption.bind(this, state, type),

        {
            onSuccess: async (option) => {
                setFlashMsg(<SuccessNotificationStyled> {captial} {option.name} successfully added! </SuccessNotificationStyled>);
                await queryCache.invalidateQueries("options");
                dispatch({action_fn: OptionsStore.addOption, type, anOption: option});
                // Query Invalidations
            },
            onError: async (result) => {
                setFlashMsg(<ErrorNotificationStyled> {result.response.data.message} </ErrorNotificationStyled>);
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
        const anOption = {
            name: data.addOption
        };
        reset();
        await addTheOption(anOption);

    };

    return (<div>
        {(state.options && Object.prototype.hasOwnProperty.call(state.options, plural)) &&
        <>
            <AdminSection optionResources={(state.options) ? state.options[plural] : []} isEnabled={true} toggleDisabled={toggleOption}
                          />
            <AdminSection optionResources={(state.options) ? state.options[plural] : []} isEnabled={false} toggleDisabled={toggleOption}
                          />

            <form onSubmit={handleSubmit(onSubmit.bind(this))}>
                <FieldContainer>
                    <FieldStyled width={225} type="text" name="addOption" ref={register({required: true})}></FieldStyled>
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

AdminOptions.propTypes = {
    setFlashMsg: PropTypes.func,
    type: PropTypes.string
};

export default AdminOptions;