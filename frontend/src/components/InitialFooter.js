import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Logo_Ufac from '../assets/Logo_ufac.svg';

const useStyles = makeStyles((theme) => ({
    footer: {
        minHeight: '5vh',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            '& div': {
                padding: '5px'
            }
        },
        '& div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}));

export default function InitialFooter(props) {
    const classes = useStyles();

    return(
        <Grid container style={props.style} className={classes.footer}>
        </Grid>
    );

}
