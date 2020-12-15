import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { stringToBoolean } from "../../utils/displayUtils";
import TabBG from "../../images/tab-bg.jpg";
import useGetOptions from "../../hooks/useGetOptions";
import { PropTypes } from "prop-types";

const TabsUL = styled.ul`
    height: 30px;
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
    padding: 0;
    margin-bottom: 0px;
`;

const TabsLI = styled.li`
    color: #333;
    font: 11px/16px Verdana,sans-serif;
    float: left;
    list-style-type: none;
`;

const StyledLink = styled(Link)`
    float: left;
    font-size: 12px !important;
    display: block;
    padding: 5px 30px;
    text-decoration: none;
    border: 1px solid #ccc;
    border-bottom: ${({active}) => stringToBoolean(active) ?  "1px solid #fff": 0};
    height: 18px;
    background: ${({active}) => stringToBoolean(active) ? "#fff" : `#fff url(${TabBG}) bottom left repeat-x`};
    color: ${({active}) => stringToBoolean(active) ? "#90af4c":  "#777"};
    font-weight: bold;
    margin-right: 6px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    position: relative;
    top: 1px;
`;

const TabPane = styled.div`
    min-height: 110px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
`;

// eslint-disable-next-line react/display-name
const Admin = React.memo(() => {
    const location = useLocation();

    useGetOptions(false);

    return(<>
        <h2>Admin</h2>

        <TabsUL>
            <TabsLI><StyledLink active={`${location.pathname === '/admin' || location.pathname === '/admin/groups'}`}
                                to="/admin/groups">Groups</StyledLink> </TabsLI>
            <TabsLI><StyledLink active={`${location.pathname === '/admin/statuses'}` }
                                to="/admin/statuses">Statuses</StyledLink></TabsLI>
            <TabsLI><StyledLink active={`${location.pathname === '/admin/priorities'}`}
                                to="/admin/priorities">Priorities</StyledLink></TabsLI>
            <TabsLI><StyledLink active={`${location.pathname === '/admin/time_types'}`}
                                to="/admin/time_types">Time Types</StyledLink></TabsLI>
            <TabsLI><StyledLink active={`${location.pathname === '/admin/users'}`}
                                to="/admin/users">Users</StyledLink></TabsLI>
        </TabsUL>
        <TabPane>
           <Outlet/>
        </TabPane>
    </>);
});

export default Admin;