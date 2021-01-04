import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LogoUfac from '../assets/Logo_ufac.svg';

const useStyles = makeStyles((theme) => ({
    footer: {
        height: '5vh',
        paddingTop: '3vh',
        [theme.breakpoints.down('sm')]: {
            '& div': {
                padding: '5px'
            }
        },
        '& div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingBottom: 13,
            backgroundColor: "#C4C4C4",
        }
    },  
    noLinkStyle: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: '#444'
        }
    },
}));

export default function InitialFooter() {
    const classes = useStyles();

    return(
        <Grid container className={classes.footer}>
        </Grid>
    );

}
