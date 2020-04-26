import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonCustom from '../../Component/Button';
import InitialNavbar from '../../Component/InitialNavbar';
import InitialFooter from '../../Component/InitialFooter';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Carousel from 'react-material-ui-carousel';


const useStyles = makeStyles((theme) => ({
    container: {
        color: '#FFF',
        backgroundImage: `url(${"/images/BG1.svg"})`,
        background: 'no-repeat center center',
        minHeight: '100vh',
        backgroundSize: 'cover'
    },
    buttonFix: {
        '& a button': {
            whiteSpace: 'nowrap',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                whiteSpace: 'initial',
                height: '100%'
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

    containerCarousel: {
        padding: '0 20%',
        [theme.breakpoints.down('xs')]: {
            padding: 0
        }
    }

}));

export default function Landing() {
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>
            <Grid container>
                <InitialNavbar/>
            </Grid>

            <Grid container style={{ paddingTop: '8%' }}>
                <Grid item xs={12}>
                    <Carousel>
                        <Grid container className={classes.containerCarousel}>
                            <Grid item xs={12} style={{ fontSize: 30, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                Gostaria de contribuir para a sustentação de alguma instituição?
                                Diversas instituições carecem de recursos básicos e que você pode doar.
                                <Grid item xs={12} style={{ flexBasis: 'auto', marginTop: 15, padding: 0 }}>
                                    <Grid container>
                                        <Grid item xs={6} className={classes.buttonFix} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                                            <Link to="/instituicoes" className={classes.noLinkStyle} style={{ width: '100%' }}>
                                                <ButtonCustom variant="blue">
                                                    VER INSTITUIÇÕES
                                                </ButtonCustom>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={6} className={classes.buttonFix} style={{ display: 'flex'}}>
                                            <Link to="/doador" className={classes.noLinkStyle}>
                                                <ButtonCustom variant="yellow" style={{ heigth: 'fit-content' }}>
                                                    <FavoriteIcon style={{ paddingRight: 5, width: 20, height: 15 }} /> QUERO SER DOADOR
                                                </ButtonCustom>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.containerCarousel}>
                            <Grid item xs={12} className={classes.textos2}>
                                <label>Você é responsável por alguma instituição e está necessitando de recursos? Junte-se a nós!</label>
                                <Link to="/instituicao" className={classes.noLinkStyle}>
                                    <ButtonCustom variant="blueDark" style={{ margin: '0 auto', marginTop: 15 }}>
                                        CADASTRAR INSTITUIÇÃO
                                    </ButtonCustom>
                                </Link>
                            </Grid>
                        </Grid>
                    
                    </Carousel>
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
