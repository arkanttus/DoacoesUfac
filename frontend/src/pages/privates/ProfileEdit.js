import React from 'react';
import {getUser} from '../../services/auth'
import ProfileEditDonator from './ProfileEditDonator'
import ProfileEditInstitution from './ProfileEditInstitution'

export default function ProfileEdit() {
    const user = getUser()

    return (
        <>
            {user.typeUser === "Doador" ? ( 
                <ProfileEditDonator />
            ): 
            (
                <ProfileEditInstitution />
            )}
        </>
    )
}
