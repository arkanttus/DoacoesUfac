import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '85vh',
        flexWrap: 'initial',
        flexDirection: 'column',
        backgroundColor: 'red',
    }
}));

export default function Home() {
    const classes = useStyles();
    return(
        <Grid container className={classes.container}>
            <h1>Dash</h1>
            <h1>Dash</h1>
            <h1>Dash</h1>
            <h1>Dash</h1>
            <h1>Dash</h1>
        </Grid>
    );
}
