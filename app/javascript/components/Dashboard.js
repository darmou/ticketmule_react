import styled from "styled-components";
import TicketBoard from "./TicketBoard";
import React from "react";

const Dashboard = () => {
    return (
        <DashboardStyled>
            <MainStyled>
                <div>
                    <TicketBoard/>
                </div>
            </MainStyled>
        </DashboardStyled>
    );
};

const DashboardStyled = styled.div`
    width: 75%;
`;

export const leftColumn = `
    float: left;
    padding-left: 15px;
    margin: 0 1% 0 0;
`;

const MainStyled = styled.div`
    padding: 15px 0 0 0;
    overflow: hidden;
    width: 92%;
    min-width: 860px;
    margin: 0 auto 20px;
    ${leftColumn}
`;

export default Dashboard;