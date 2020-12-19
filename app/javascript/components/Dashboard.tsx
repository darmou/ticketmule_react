import styled from "styled-components";
import TicketBoard from "./Tickets/TicketBoard";
import React from "react";

const Dashboard = () => {
    return (
        <>
            <MainStyled>
                <div>
                    <TicketBoard/>
                </div>
            </MainStyled>
        </>
    );
};

export const leftColumn = `
    float: left;
    margin: 0 1% 0 0;
`;

const MainStyled = styled.div`
    overflow: hidden;
    width: 100%;
    min-width: 860px;
    margin: 0 auto 20px;
    ${leftColumn}
`;

export default Dashboard;