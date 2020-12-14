import Users from "./Users";
import {Route, Routes} from "react-router-dom";
import { PropTypes } from "prop-types";
import User from "./User";
import UserEdit from "./UserEdit";
import UserNew from "./UserNew";
import React from "react";

const UserRoutes = ({setFlashMsg}) => {

    return (
        <Routes>
            <Route path='/' element={<Users/>}/>
            <Route path=':slug' element={<User/>}/>
            <Route path=':slug/edit' element={<UserEdit setFlashMsg={setFlashMsg}/>}/>
            <Route path='new' element={<UserNew/>}/>
        </Routes>
    );
};

UserRoutes.propTypes = {
  setFlashMsg: PropTypes.func
};

export default UserRoutes;