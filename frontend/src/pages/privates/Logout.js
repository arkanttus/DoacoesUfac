import React from 'react';
import { Redirect } from 'react-router-dom';

//api
import api,  { sendRequest, getDonations } from "../../services/api";
import { getUser, logout } from '../../services/auth';

export default function Logout({ props }) {

    const user = getUser()

    async function serverLogout() {
        let response = await sendRequest("POST", "logout/", {});
    }

    React.useEffect(() => {
        serverLogout();
    }, []);
    logout();
    
    return <Redirect to="/login"/>;
}
