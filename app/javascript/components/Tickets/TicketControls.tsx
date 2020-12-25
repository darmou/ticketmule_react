import React, {Fragment, useContext} from "react";
import { pure } from "recompose";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import PrimaryButton from "../PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import SecondaryButton from "../ComponentLibrary/SecondaryButton";
import { FakeLink } from "../ComponentLibrary/StyledLinks";
import { FieldStyled, Label, StyledRow } from "../ComponentLibrary/FormComponentsStyled";
import { TicketContext } from "../../packs/application";
import ResourceStore from "../../actions/resourceStore";
import { isEmpty } from "../../utils/displayUtils";
import "react-datepicker/dist/react-datepicker.css";
import useGetOptions from "../../hooks/useGetOptions";
import usePrevious from "../../hooks/usePrevious";
import {RESOURCE_TYPES} from "../../types/types";

const newResource = (event, navigate, resourceType) => {
    navigate(`/${resourceType}/new`);
};

const InputFeedback = styled.div`
    color: red;
`;

const StyledUL = styled.ul`
    margin-left: -25px;
        
    li {
        margin-bottom: 5px;
    }

    a:link, a:visited {
        color: #4d88cf;
    }
    
    a:hover {
        color: #90af4c;
    }
`;

const GroupSelect = styled.select`
    width: 150px;
`;

const ContactSelect = styled.select`
    width: 200px;
`;

const StatusSelect = styled.select`
    width: 100px;
`;

const PrioritySelect = styled.select`
    width: 80px;
`;

const TimeTypeSelect = styled.select`
    width: 120px;
`;

const OwnedBySelect = styled.select`
    width: 150px;
`;

const FilterForm = styled.form`

    select {
        height: 29px;
    }
    
    input {
        height: 25px;
    }
    
    select, input {
        border: 1px solid #ccc;
    }
`;

interface Props {
    loggedIn: boolean
}

const TicketControls = ({loggedIn} : Props) => {
    const { register, handleSubmit, errors } = useForm();
    const { options } = useGetOptions(true);
    const filterForm = useForm();
    const { dispatch, state }  = useContext(TicketContext);
    const { user } = state;
    const [showFilterForm, setShowFilterForm] = React.useState(false);
    const navigate = useNavigate();
    const [currentTicketId, setCurrentTicketId] = React.useState();
    const previousTIcketId = usePrevious(currentTicketId);
    const location = useLocation();

    const onFilterFormSubmit = (filterData) => {
        let newFilterString = "";
        Object.keys(filterData["search"]).forEach((filterKey) => {
            if (isEmpty(filterData["search"][filterKey])) {
                     delete filterData["search"][filterKey];
            } else {
                newFilterString = `${newFilterString}&search[${filterKey}]=${filterData["search"][filterKey]}`;
            }
        });

        dispatch({action_fn: ResourceStore.setSearchString, searchStr: newFilterString, resourceType: RESOURCE_TYPES.TICKET});
    };

    const filterTickets = (type) => {
            switch (type) {
                case "my_open":
                    dispatch({action_fn: ResourceStore.setSearchString,
                        searchStr: `&search[status_id]=${user.id}&search[owned_by]=${user.id}`,
                        resourceType: RESOURCE_TYPES.TICKET});
                    break;
                case "all":
                    dispatch({action_fn: ResourceStore.setSearchString,
                        searchStr: "", resourceType: RESOURCE_TYPES.TICKET});
                    break;
                case "my_closed":
                    dispatch({action_fn: ResourceStore.setSearchString,
                        searchStr: `&search[status_id]=2&search[owned_by]=${user.id}`,
                        resourceType: RESOURCE_TYPES.TICKET});
                    break;
                case "closed":
                    dispatch({action_fn: ResourceStore.setSearchString,
                        searchStr: `&search[status_id]=2`,
                        resourceType: RESOURCE_TYPES.TICKET});
                    break;
            }
    };

    React.useEffect(() => {
            if (previousTIcketId !== currentTicketId) {
                navigate(`/tickets/${currentTicketId}`);
            }
        }
    );

    const buttons = (location != null && !location.pathname.includes('/admin')) ?
        (<Fragment><PrimaryButton click={e => newResource(e, navigate, 'tickets')} text="New ticket"/>
            <PrimaryButton click={e => newResource(e, navigate, 'contacts')} text="New Contact"/></Fragment>) : null;

    const onSubmit = (values) => {
        setCurrentTicketId(values.jumpId);
    };

    if (loggedIn === false) return null;

    return (<>
        {buttons}
        <RightContainerStyled>
            <h3>Jump to Ticket</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>
                    <label htmlFor="jumpId"><em>Enter a ticket number:</em></label><br/>
                    <FieldStyled
                        name="jumpId"
                        type="text"
                        FieldStyled
                        ref={register({required: true, pattern: /^\d+$/})}
                        className={
                            errors.jumpId ? 'error' : ''
                        }
                    />
                    <SecondaryButton type="submit">
                        Go
                    </SecondaryButton>
                    {errors.jumpId && (
                        <InputFeedback>{(errors.jumpId.type === 'pattern') ? "Must be an integer only."
                            : "Please enter ticket number."}</InputFeedback>
                    )}
                </p>
            </form>

            {(location.pathname === "/tickets") && <>
               <h3>Filter Tickets</h3>
                <StyledUL id="filter-links">
                    <li><FakeLink onClick={() => filterTickets("my_open")}>My Open Tickets</FakeLink>
                    </li>
                    <li><FakeLink onClick={() => filterTickets("my_closed")}>My Closed
                        Tickets</FakeLink></li>
                    <li><FakeLink onClick={() => filterTickets("all")}>All Active Tickets</FakeLink></li>
                    <li><FakeLink onClick={() => filterTickets("closed")}>All Closed Tickets</FakeLink></li>
                    <li><FakeLink onClick={(event) =>
                        {event.stopPropagation();setShowFilterForm(!showFilterForm);}}>Custom Filter...</FakeLink></li>
                </StyledUL>

                {(showFilterForm) && <FilterForm onSubmit={filterForm.handleSubmit(onFilterFormSubmit)} id="ticket-filter" >
                    <StyledRow marginBottom={3}>
                        <Label htmlFor="filter-title">Title</Label>
                        <input ref={filterForm.register} className="textfield" id="filter-title" name="search[title]" size={30}
                               type="text"/>
                    </StyledRow>
                    <StyledRow marginBottom={3}>
                        <Label htmlFor="search_group_id">Group</Label>
                        <GroupSelect ref={filterForm.register}
                            className="selectbox"
                            id="search_group_id"
                            name="search[group_id]">
                            <option value=""></option>
                            { (options && Object.prototype.hasOwnProperty.call(options, 'groups')) &&
                            options.groups.filter((group) => group.disabled_at == null).map(group => {
                                return (<option  key={`group_${group.id}`} value={group.id}>{group.name}</option>);
                            })
                            }
                        </GroupSelect>
                    </StyledRow>

                    <StyledRow marginBottom={3}>
                        <Label htmlFor="search_contact_id">Contact</Label>
                        <ContactSelect ref={filterForm.register}
                                       className="selectbox"
                                       id="search_contact_id"
                                       name="search[contact_id]">
                            <option value=""></option>
                            { (options && Object.prototype.hasOwnProperty.call(options, 'contacts')) && options.contacts.map(contact => {
                                return (<option key={`contact_${contact.id}`} value={contact.id}>{contact.first_name} {contact.last_name}</option>);
                            })
                            }
                        </ContactSelect>
                    </StyledRow>

                    <StyledRow marginBottom={3}>
                        <Label htmlFor="search_status_id">Status</Label>
                        <StatusSelect ref={filterForm.register}
                                      className="selectbox"
                                      id="search_status_id"
                                      name="search[status_id]">
                            <option value=""></option>
                            { (options && Object.prototype.hasOwnProperty.call(options, 'statuses')) &&
                            options.statuses.filter((group) => group.disabled_at == null).map(status => {
                                return (<option  key={`status_${status.id}`} value={status.id}>{status.name}</option>);
                            })
                            }
                        </StatusSelect>
                    </StyledRow>

                    <StyledRow marginBottom={3}>
                        <Label htmlFor="search_priority_id">Priority</Label>
                        <PrioritySelect ref={filterForm.register}
                                        className="selectbox"
                                        id="search_priority_id"
                                        name="search[priority_id]">
                            <option value=""></option>
                            { (options && Object.prototype.hasOwnProperty.call(options, 'priorities')) &&
                            options.priorities.filter((group) => group.disabled_at == null).map(priority => {
                                return (<option key={`time_type_${priority.id}`} value={priority.id}>{priority.name}</option>);
                            })
                            }
                        </PrioritySelect>
                    </StyledRow>

                    <StyledRow marginBottom={3}>
                        <Label htmlFor="search_time_type_id">Time Type</Label>
                        <TimeTypeSelect ref={filterForm.register}
                                        className="selectbox"
                                        id="search_time_type_id"
                                        name="search[time_type_id]">
                            <option value=""></option>
                            { (options && Object.prototype.hasOwnProperty.call(options, 'time_types')) &&
                            options.time_types.filter((group) => group.disabled_at == null).map(time_type => {
                                return (<option key={`time_type_${time_type.id}`} value={time_type.id}>{time_type.name}</option>);
                            })
                            }
                        </TimeTypeSelect>
                    </StyledRow>

                    <StyledRow marginBottom={3}>
                        <Label htmlFor="search_owned_by">Owner</Label>
                        <OwnedBySelect ref={filterForm.register}
                                       className="selectbox"
                                       id="search_owned_by"
                                       name="search[owned_by]">
                            <option value=""></option>
                            { (options && Object.prototype.hasOwnProperty.call(options, 'owners')) && options.owners.map(owner => {
                                return (<option key={`owner_${owner.id}`} value={owner.id}>{owner.username}</option>);
                            })
                            }
                        </OwnedBySelect>
                    </StyledRow>

                    <StyledRow marginBottom={3}>
                        <Label htmlFor="filter-start">From</Label>
                        <Controller
                            name="search[created_at_gte]"
                            control={filterForm.control}
                            render={({ onChange, value }) => (
                                <DatePicker
                                    selected={value}
                                    popperPlacement="top"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={onChange}
                                />
                            )}
                        />
                    </StyledRow>

                    <StyledRow marginBottom={3}>
                        <Label htmlFor="filter-end">To</Label>

                        <Controller
                            name="search[created_at_lt]"
                            control={filterForm.control}
                            render={({ onChange, value }) => (
                                <DatePicker
                                    selected={value}
                                    popperPlacement="top"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={onChange}
                                />
                            )}
                        />

                    </StyledRow>

                    <StyledRow marginBottom={3}>
                        <SecondaryButton id="search_submit" name="commit" type="submit">Submit</SecondaryButton>&nbsp;<FakeLink onClick={filterForm.reset}>Clear Form</FakeLink>
                    </StyledRow>
                </FilterForm>}
            </>}
        </RightContainerStyled>
    </>);
};

const RightContainerStyled = styled.div`
    margin-top: 20px;
    h3 {
        padding: 0 0 2px 0;
        color: #90af4c;
        border-bottom: 1px dotted #bbb;
        text-shadow: 0 1px 0 #fff;
    }
    
    p {
        color: #666;
    }
    
    em {
        font-style: italic;
    }
`;

export default pure(TicketControls);