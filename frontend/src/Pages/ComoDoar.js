import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import InitialNavbar from '../Component/InitialNavbar';
import InitialFooter from '../Component/InitialFooter';
import ButtonCustom from '../Component/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
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


export default function ComoDoar() {
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>
             <Grid container>
                <InitialNavbar/>
             </Grid>

            <Grid container justify="center">
                <Grid item container  justify="center" xs={12} alignItems="center">
                    <Typography variant="h4" align="center">
                        <Box fontWeight="fontWeightMedium" m={1}>
                            COMO DOAR?
                        </Box>
                    </Typography>
                </Grid>
            </Grid>

            <Grid container style={{  display:"flex",  justifyContent:"center",textAlign:"center"}}>   
               <Grid container className={classes.text}>
                   
                    <label style={{  fontSize: 22} }>
                            <p>
                                Para fazer uma doação, basta se fornecer alguns dados, selecionar uma instituição e entrar em contato com a instituição.
                            </p>
                            <p>
                                Seu cadastro é importamente para recomendarmos de maneira justa instituições que receberam poucas doações.
                            </p>
                    </label>
                </Grid>       
            </Grid>

            <Grid container style={{paddingBottom:"15%", justifyContent:"center"}}>
                <Link to="/registro-doador" className={classes.noLinkStyle}>
                        <ButtonCustom variant="yellow" style={{ heigth: 'fit-content' }}>
                            <FavoriteIcon style={{ paddingRight: 5, width: 20, height: 15 }} /> <label style={{ whiteSpace: 'nowrap' }}>QUERO SER DOADOR</label>
                        </ButtonCustom>
                </Link>
            </Grid>
            
        
        </Grid>
    );
}