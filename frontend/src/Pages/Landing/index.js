import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonCustom from '../../Component/Button';
import InitialNavbar from '../../Component/InitialNavbar';
import InitialFooter from '../../Component/InitialFooter';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => ({
    container: {
        color: '#FFF',
        backgroundImage: `url(${"/images/BG1.svg"})`,
        background: 'no-repeat center center',
        minHeight: '100vh',
        backgroundSize: 'cover'
    },
    buttonFix: {
        '& button': {
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        }   
    },

    textos2: {
        fontSize: 30,
        padding: 15,
        paddingTop: 35,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: '#e5e5e5'
        }
    },
}));

export default function Landing() {
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>
            <Grid container>
                <InitialNavbar/>
            </Grid>
            
            <Grid container>
                <Grid item xs={12} sm={5} style={{ fontSize: 30, padding: 15, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    Gostaria de contribuir para a sustentação de alguma instituição?
                    Diversas instituições carecem de recursos básicos e que você pode doar.
                    <Grid item xs={12} style={{ flexBasis: 'auto', marginTop: 15 }}>
                        <Grid container>
                            <Grid item xs={6} className={classes.buttonFix} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                                <Link to="/instituicoes" className={classes.noLinkStyle}>
                                    <ButtonCustom variant="blue" style={{ height: 'fit-content' }}>
                                        VER INSTITUIÇÕES
                                    </ButtonCustom>
                                </Link>
                            </Grid>
                            <Grid item xs={6} className={classes.buttonFix} style={{ display: 'flex', paddingLeft: 10 }}>
                                <Link to="/doador" className={classes.noLinkStyle}>
                                    <ButtonCustom variant="yellow" style={{ heigth: 'fit-content', whiteSpace: 'nowrap' }}>
                                        <FavoriteIcon style={{ paddingRight: 5, width: 20, height: 15 }} /> QUERO SER DOADOR
                                    </ButtonCustom>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={2}></Grid>

                <Grid item xs={12} sm={5} className={classes.textos2}>
                    <label>Você é responsável por alguma instituição e está necessitando de recursos? Junte-se a nós!</label>
                    <Link to="/instituicao" className={classes.noLinkStyle}>
                        <ButtonCustom variant="blueDark" style={{ margin: '0 auto', marginTop: 15 }}>
                            CADASTRAR INSTITUIÇÃO
                        </ButtonCustom>
                    </Link>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to="/login" className={classes.noLinkStyle}>
                        <ButtonCustom variant="green">
                            ACESSAR MINHA CONTA
                        </ButtonCustom>
                    </Link>
                </Grid>
            </Grid>

            <Grid container>
                <InitialFooter/>
            </Grid>
        </Grid>
    );
}
