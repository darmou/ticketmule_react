import React from "react";
import styled, { css } from "styled-components";

import { renderList } from "../utils/display_utils";
import { ticketsTypes } from "../actions/ticket_store";
import moment from "moment";
import { TableSection, H3ToggleStyled  } from "./TableSection";
import RedBullet from "../images/bullet_red.png";
import YellowBullet from "../images/bullet_yellow.png";
import BlueBullet from "../images/bullet_blue.png";
import useSliderToggle from "react-slide-toggle-hooks";

const TICKET_TYPES = {
    OPENED: 'opened',
    CLOSED: 'closed'
};
Object.freeze(TICKET_TYPES);

const main_header_items = [
    { id: 0, content: "Ticket #" },
    { id: 1, content: "Title" },
    { id: 2, content: "Group" },
    { id: 3, content: "Status" },
    { id: 4, content: "Priority" },
    { id: 5, content: "Time Type" },
    { id: 6, content: "Owner" }
];

const headerItems = [
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


export const getTicketImage = (priorityId) => {
  const priorityIdMap = {
      1: `url(${RedBullet}) left center no-repeat;`,
      2: `url(${YellowBullet}) left center no-repeat;`,
      3: `url(${BlueBullet}) left center no-repeat;`,
  };
  return priorityIdMap[priorityId];
};


export const SLIDE_DURATION = 800;

const TicketBoard = () => {
    const { toggle, setCollapsibleElement, slideToggleState } = useSliderToggle({duration: SLIDE_DURATION});

    return (
       <TicketBoardStyled>
            <h2>Dashboard</h2>

           <TableSection type={ticketsTypes.NOT_CLOSED} slideDuration={SLIDE_DURATION} headerItems={headerItems} sectionName="Active Tickets" sectionId="active-listing"/>
           <TableSection type={ticketsTypes.CLOSED} slideDuration={SLIDE_DURATION} headerItems={closed_ticket_items} sectionName="Recently Closed Tickets" sectionId="closed-listing"/>

           <>
               <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>Timeline</H3ToggleStyled>
               <TimelineWrapperStyled ref={setCollapsibleElement} css={css``} >
                   <TimelineStyled isLeft={true}>
                       {ticketTimeLineList(TICKET_TYPES.OPENED, null)}
                       <SpanTimelineLabel>Opened Tickets</SpanTimelineLabel>
                   </TimelineStyled>
                   <TimelineStyled isLeft={false}>
                       {ticketTimeLineList(TICKET_TYPES.CLOSED, null)}
                       <SpanTimelineLabel>Closed Tickets</SpanTimelineLabel>
                   </TimelineStyled>
               </TimelineWrapperStyled>
           </>

       </TicketBoardStyled>
    );
};

export const header = `
    background: #f1f1f1;
`;


export const ImageSpan = styled.span.attrs(props => ({
    background: props.background
}))`
    font-weight: bold;
    background: ${({background}) => background};
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
    }
    tr {
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
      position: relative;
      bottom: 0;
      left: 0;
      height: 0;
      width: 100%;
      background: #bdbdbd;
      text-indent: -9999px;
      overflow: hidden;
`;

const TimelineStyled = styled.div`
    padding: 0;
    margin: 0;
    width: auto;
    background: #fff;
    float: ${({isLeft}) => (isLeft) ? 'left': 'right'};
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