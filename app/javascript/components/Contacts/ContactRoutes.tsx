import Contacts from "./Contacts";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import ContactEdit from "./ContactEdit";
import ContactNew from "./ContactNew";
import React from "react";


const ContactRoutes = () => {

    return (
            <Routes>
                <Route index={true} element={<Contacts/>}/>
                <Route path=':slug' element={<Contact/>}/>
                <Route path=':slug/edit' element={<ContactEdit/>}/>
                <Route path='new' element={<ContactNew/>}/>
            </Routes>
    );
};

export default ContactRoutes;