import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    containerRoot: {
        minHeight: '85vh',
        '& div': {
            height: 'fit-content'
        }
    },
    container: {
        height: 'fit-content'
    }
}));

export default function Home() {
    const classes = useStyles();
    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={6}>a</Grid> <Grid item xs={12} sm={6}>a</Grid>
                <Grid item xs={6}>a</Grid> <Grid item xs={6}>a</Grid>
            </Grid>
            
        </Grid>
    );
}
