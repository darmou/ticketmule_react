import React, { useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import MinusImage from "../images/minus.gif";
import { Link } from "react-router-dom";
import { renderTableHeader, renderList } from "../utils/display_utils";
import moment from "moment";
import { TicketContext } from "../packs/application";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import differenceInDays from "date-fns/differenceInDays";
import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInMonths from "date-fns/differenceInMonths";
import differenceInYears from "date-fns/differenceInYears";
import { fetchTickets } from "../actions";
import RedBullet from "../images/bullet_red.png";
import YellowBullet from "../images/bullet_yellow.png";
import BlueBullet from "../images/bullet_blue.png";

const ticket_types = {
    OPENED: 'opened',
    CLOSED: 'closed'
};

const main_header_items = [
    { id: 0, content: "Ticket #" },
    { id: 1, content: "Title" },
    { id: 2, content: "Group" },
    { id: 3, content: "Status" },
    { id: 4, content: "Priority" },
    { id: 5, content: "Time Type" },
    { id: 6, content: "Owner" }
];

const header_items = [
    ...main_header_items,
    { id: 7, content: "Last Activity" }
];

const closed_ticket_items = [
    ...main_header_items,
    { id: 7, content: "Closed At" }
];

const ticketTimeLineList = (type, style) => {
    let the_str_date, content = null;
    const type_tickets = [];
    Array.from({ length: 30 }).forEach((x, i) => {
        the_str_date = moment().subtract((30 - (i+1)), 'days').format('YYYY-M-D');
        content = <a href="#" title={`0 tickets ${type} on ${the_str_date}`} onClick={() => false}>
            <CountSpanStyled style={{height: '1px'}}>0</CountSpanStyled>
        </a>;
        type_tickets.push({id: i, content: content});
    });
    return renderList(type_tickets, style);
};

const diffTime = (createdDate, type, diffFunc, cutoff) => {
    const diffInTime = diffFunc(new Date(), new Date(createdDate));
    if (diffInTime > cutoff && cutoff !== -1) {
        return [];
    }
    const label = diffInTime == 1 ? type : `${type}s`;
    return [diffInTime, label];
};

export const getTimeDiff = (createdDate) => {
    const timeDiffHashArray = [
        {
            type: 'min',
            timeFunc: differenceInMinutes,
            cutoff: 60
        },
        {
            type: 'hour',
            timeFunc: differenceInHours,
            cutoff: 24,
        },
        {
            type: 'day',
            timeFunc: differenceInDays,
            cutoff: 7,
        },
        {
            type: 'week',
            timeFunc: differenceInWeeks,
            cutoff: 4,
        },
        {
            type: 'month',
            timeFunc: differenceInMonths,
            cutoff: 12,
        },
        {
            type: 'year',
            timeFunc: differenceInYears,
            cutoff: -1,
        },
    ];
    let diffInTime = [];
    let timeHash = {};
    let index = 0;
    while (diffInTime.length === 0) {
        timeHash = timeDiffHashArray[index];
        diffInTime = diffTime(createdDate, timeHash.type, timeHash.timeFunc, timeHash.cutoff);
        index = index +1;
    }
    return diffInTime;
};

const getTicketImage = (priorityId) => {
  const priorityIdMap = {
      1: `url(${RedBullet}) left center no-repeat;`,
      2: `url(${YellowBullet}) left center no-repeat;`,
      3: `url(${BlueBullet}) left center no-repeat;`,
  };
  return priorityIdMap[priorityId];
};

const renderTickets = (tickets) => {

    if (tickets) {
        return tickets.map((ticket, index) => {
            const timeDiff = getTimeDiff(ticket.updated_at);

            return (<tr key={`${index}`} >
                <ImageTD background={getTicketImage(ticket.priority.id)}>
                    <Link to={`/tickets/${ticket.id}`}  title={ticket.title}>{ticket.id}</Link>
                </ImageTD>
                <td>{ticket.title}</td>
                <td>{ticket.group.name}</td>
                <td>{ticket.status.name}</td>
                <td>{ticket.priority.name}</td>
                <td>{ticket.time_type.name}</td>
                <td><Link to={`/users/${ticket.owner.username}`}>{ticket.owner.username}</Link></td>
                <td>{timeDiff[0]} {timeDiff[1]} ago</td>
            </tr>);
        });
    }

    return null;

};

const TicketBoard = () => {

    const { state, dispatch } = useContext(TicketContext);
    const { tickets, user } = state;


    useEffect( () => {
        async function fetchTicketData() {
            await fetchTickets(user.email, user.authentication_token, dispatch);
        }
        if (tickets == null) {
            fetchTicketData();
        }
    }, [tickets, user, dispatch]);

    const theTickets = renderTickets(state.tickets);

    return (
       <TicketBoardStyled>
            <h2>Dashboard</h2>

           <H3ToggleStyled>Active Tickets</H3ToggleStyled>
            <div id="active-listing">
                <TableListingStyled cellSpacing="0">
                    <thead>
                    { renderTableHeader(header_items, css(header)) }
                    </thead>
                    <tbody>
                    {theTickets}
                    </tbody>
                </TableListingStyled>
            </div>

           <H3ToggleStyled>Recently Closed Tickets</H3ToggleStyled>
            <div id="closed-listing">
                <TableListingStyled cellSpacing="0">
                    <thead>
                    {renderTableHeader(closed_ticket_items, css(header))}
                    </thead>
                    <tbody>
                    </tbody>
                </TableListingStyled>
            </div>

            <H3ToggleStyled>Timeline</H3ToggleStyled>
            <TimelineWrapperStyled>
                <TimelineStyled isLeft={true}>
                    {ticketTimeLineList(ticket_types.OPENED, null)}
                    <SpanTimelineLabel>Opened Tickets</SpanTimelineLabel>
                </TimelineStyled>
                <TimelineStyled isLeft={false}>
                    {ticketTimeLineList(ticket_types.CLOSED, null)}
                    <SpanTimelineLabel>Closed Tickets</SpanTimelineLabel>
                </TimelineStyled>
            </TimelineWrapperStyled>
       </TicketBoardStyled>
    );
};

export const header = `
    background: #f1f1f1;
`;

const toggle = `
    padding: 6px 0 6px 20px;
    background: url(${MinusImage}) no-repeat left center;
    &:hover {
      cursor: pointer;
      color: #90af4c;
    }
`;

const ImageTD = styled.td.attrs(props => ({
    background: props.background
}))`
    font-weight: bold;
    background: ${props => props.background};
    padding-left: 17px !important;

    a:hover {
        color: #90af4c;
    }
`;

const SpanTimelineLabel = styled.span`
  display: block;
  font-weight: normal;
  font-style: italic;
  text-align: center;
  padding: 0;
  margin: 0;
  line-height: 20px;
`;

export const TableListingStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 2px 0 16px 0;
    background: #fff;
    line-height: 11px;
    border-top: 1px solid #ccc;
    th {
      color: #888;
      padding: 6px 2px;
    }
    th, td {
      text-align: left;
      padding: 4px 2px;
      border-bottom: 1px solid #ccc;
    }
`;

const TimelineWrapperStyled = styled.div`
    margin: 0 0 10px 0;
    padding: 0;
    overflow: hidden;
`;

const CountSpanStyled = styled.span`
      padding: 0;
      margin: 0;
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 0;
      width: 100%;
      background: #bdbdbd;
      text-indent: -9999px;
      overflow: hidden;
`;


const H3ToggleStyled = styled.h3`
    ${toggle}
`;



const TimelineStyled = styled.div`
    padding: 0;
    margin: 0;
    width: auto;
    background: #fff;
    float: ${props => { return (props.isLeft) ? 'left': 'right';}};
`;

export const TicketBoardStyled = styled.div`
  padding: 10px;
  margin: 0 5px 5px 0;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  box-shadow: 2px 2px 3px #ddd;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-box-shadow: 2px 2px 3px #ddd;
  -webkit-box-shadow: 2px 2px 3px #ddd;

  h3 {
    font-size: 13px;
    line-height: 16px;
    margin: 0 0 5px 0;
    color: #4d88cf;
  }
  
  h2 {
    font-size: 18px;
    line-height: 16px;
    letter-spacing: -1px;
    text-shadow: 1px 1px 2px #cecece;
  }

  h1, h2 {
    color: #90af4c;
    margin: 0 0 16px 0;
    height: auto;
  }
`;

export default TicketBoard;