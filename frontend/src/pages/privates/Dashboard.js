import React from 'react';
import {getUser} from '../../services/auth'
import DashboardDonator from './DashboardDonator'
import DonateList from './DonationList'

export default function Dashboard() {
    const user = getUser()

    return (
        <>
            {user.typeUser === "Doador" ? ( 
                <DashboardDonator />
            ): 
            (
                <DonateList />
            )}
        </>
    )
}
