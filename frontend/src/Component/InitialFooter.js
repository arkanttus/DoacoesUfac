import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        paddingTop: '20px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '50px',
            '& div': {
                padding: '5px'
            }
        },
        '& div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingBottom: 13,
        }
    },  
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: '#e5e5e5'
        }
    },
}));

export default function InitialFooter() {
    const classes = useStyles();

    return(
        <Grid container className={classes.footer}>
            <Grid item xs={12} sm={2} style={{ fontSize: '.85rem' }}>
                <Link to="/equipe" className={classes.noLinkStyle}>
                    SOBRE A EQUIPE
                </Link>
            </Grid>
            <Grid item xs={12} sm={2} style={{ fontSize: '.85rem' }}>
                <Link to="/creditos" className={classes.noLinkStyle}>
                    CRÉDITOS
                </Link>
            </Grid>
            <Grid item xs={12} sm={4} style={{ paddingBottom: 5 }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="images/Logo_ufac.svg" style={{ paddingRight: 5 }} alt="Logo Ufac" /> Universidade Federal do Acre
                </label>
            </Grid>
            <Grid item xs={12} sm={4} style={{ fontSize: '.85rem' }}>
                &copy; 2020. Desenvolvido por universitários
            </Grid>
        </Grid>
    );

}
