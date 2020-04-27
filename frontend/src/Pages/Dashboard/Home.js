import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from '../../Component/MaterialKit/NavBarHeader/Header';
import { Button } from '@material-ui/core';

const Menu = (props) => {
    return (
        <>
            <Button> teste</Button>
            <Button> teste2</Button>
            <Button> teste3</Button>
        </>
    )
}

export default function Home() {
    return(
        <Grid container>
            <NavBar
            color="info"
            rightLinks={
                <Menu />
            } />
            <h1>Dash</h1>
        </Grid>
    );
}
