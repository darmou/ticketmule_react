import React from "react";
import { Outlet } from "react-router-dom";

const TicketDash = () => {
    return (
        <div id="ticket-dash">
            <Outlet/>
        </div>
    );
};

export default TicketDash;