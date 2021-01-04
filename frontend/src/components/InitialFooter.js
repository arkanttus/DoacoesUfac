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
            <Grid item xs={12} sm={4} style={{ paddingBottom: 5 }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Logo_Ufac} style={{ paddingRight: 5 }} alt="Logo Ufac" /> Universidade Federal do Acre
                </label>
            </Grid>
            <Grid item xs={12} sm={4} style={{ fontSize: '.85rem' }}>
                &copy; 2020. Desenvolvido por universitários
            </Grid>
        </Grid>
    );

}
