import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '95vh',
        flexWrap: 'initial',
        flexDirection: 'column',
        paddingTop: '13%',
        [theme.breakpoints.down('xs')]: {
            minHeight: '90vh',
            paddingTop: '45%'
        }
    },
    buttonFix: {
        '& button': {
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        }   
    },

    text: {
        padding:"0 30%",
        [theme.breakpoints.down('sm')]: {
            padding: 0
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


export default function HowToDonate() {
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>

            <Grid container justify="center">
                <Grid item container  justify="center" xs={12} alignItems="center">
                    <Typography variant="h4" align="center">
                        <Box fontWeight="fontWeightMedium" m={1}>
                            CONTATO
                        </Box>
                    </Typography>
                </Grid>
            </Grid>

            <Grid container style={{  display:"flex",  justifyContent:"center",textAlign:"center"}}>   
               <Grid container className={classes.text}>
                   
                    <label style={{  fontSize: 22} }>
                            <p>
                                Em caso de falha ou sugestões entre em contato: <strong> doacoesufac@gmail.com</strong>
                            </p>
                    </label>
                </Grid>       
            </Grid>        
        </Grid>
    );
}