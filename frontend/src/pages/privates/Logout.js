import React from 'react';
import { Redirect } from 'react-router-dom';

//api
import { sendRequest } from "../../services/api";
import { logout } from '../../services/auth';

export default function Logout({ props }) {

    async function serverLogout() {
        await sendRequest("POST", "logout/", {});
    }

    React.useEffect(() => {
        serverLogout();
    }, []);
    logout();
    
    return <Redirect to="/login"/>;
}
