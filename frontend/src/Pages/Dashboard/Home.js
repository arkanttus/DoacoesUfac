import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from '../../Component/MaterialKit/NavBarHeader/Header';

export default function Home() {
    return(
        <Grid container>
            <NavBar
            color="info"
            rightLinks={
                <ul>
                    <li>Link1</li>
                    <li>Link2</li>
                </ul>
            } />
            <h1>Dash</h1>
        </Grid>
    );
}
