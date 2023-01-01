import React from "react";
import styled, { css } from "styled-components";
import { renderList, SLIDE_DURATION } from "../../utils/displayUtils";
import moment from "moment";
import { TableSection } from "../TableSection";
import { H3ToggleStyled } from "../ComponentLibrary/H3ToggleStyled";
import RedBullet from "../../images/bullet_red.png";
import YellowBullet from "../../images/bullet_yellow.png";
import BlueBullet from "../../images/bullet_blue.png";
import useSliderToggle from "react-slide-toggle-hooks";
import useGetResources from "../../hooks/useGetResources";
import { RESOURCE_TYPES, TICKET_STATUS_TYPES, TICKET_TYPES } from "../../types/types";

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

const TicketBoard = () => {
    const { tickets, isLoading } = useGetResources(RESOURCE_TYPES.TICKET);
    const { expandableRef, slideToggleState, toggle } = useSliderToggle({duration: SLIDE_DURATION});

    return (
       <>
           <h2>Dashboard</h2>
           <TableSection isLoading={isLoading} tickets={tickets} type={TICKET_STATUS_TYPES.NOT_CLOSED} sectionName="Active Tickets" sectionId="active-listing"/>
           <TableSection isLoading={isLoading} tickets={tickets} type={TICKET_STATUS_TYPES.CLOSED}  sectionName="Recently Closed Tickets" sectionId="closed-listing"/>

           <>
               <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>Timeline</H3ToggleStyled>
               <TimelineWrapperStyled ref={expandableRef} css={css``} >
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
       </>
    );
};



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


export default TicketBoard;