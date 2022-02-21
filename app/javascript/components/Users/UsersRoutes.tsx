import Users from "./Users";
import {Route, Routes} from "react-router-dom";
import User from "./User";
import UserEdit from "./UserEdit";
import UserNew from "./UserNew";
import React from "react";

const UserRoutes = () => {

    return (
        <Routes>
            <Route index={true} element={<Users/>}/>
            <Route path=':slug' element={<User/>}/>
            <Route path=':slug/edit' element={<UserEdit/>}/>
            <Route path='new' element={<UserNew/>}/>
        </Routes>
    );
};

export default UserRoutes;