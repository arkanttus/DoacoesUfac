import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonCustom from '../../Component/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => ({
    container: {
        color: '#FFF',
        backgroundImage: `url(${"/images/BG1.svg"})`,
        background: 'no-repeat center center',
        minHeight: '100vh',
        backgroundSize: 'cover'
    },
    navbar: {
        '& ul': {
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            fontSize: '12px',
            '& li' :{
                padding: '10px 25px'
            },
            '& li:nth-of-type(2)': {
                marginRight: 'auto',
                fontSize: '18px'
            },
            '& li:nth-of-type(4)': {
                marginLeft: 'auto'
            }
        }
    },
    footer: {
        height: '100%',
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
    buttonFix: {
        '& button': {
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        }
        
    }


  }));

export default function Landing() {
    const classes = useStyles();


        return(
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <nav className={classes.navbar}>
                        <ul>
                            <li>
                                <img src="images/Logo.svg" alt="logo" className="logo" />
                            </li>
                            <li style={{ paddingLeft: 0 }}>Doações</li>
                            <Link to="/ComoDoar" className={classes.noLinkStyle}>
                                <li>COMO DOAR?</li>
                            </Link>
                            
                            <li>INSTITUIÇÕES</li>
                        </ul>
                    </nav>
                </Grid>
                
                <Grid item xs={12} sm={5} style={{ fontSize: 30, padding: 15, textAlign: 'center' }}>
                    Gostaria de contribuir para a sustentação de alguma instituição?
                    Diversas instituições carecem de recursos básicos e que você pode doar.
                    <Grid item xs={12} style={{ paddingTop: 20 }}>
                        <Grid container>
                            <Grid item xs={6} className={classes.buttonFix} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                                <ButtonCustom variant="blue" style={{ height: 'fit-content' }}>
                                    VER INSTITUIÇÕES
                                </ButtonCustom>
                            </Grid>
                            <Grid item xs={6} className={classes.buttonFix} style={{ display: 'flex', paddingLeft: 10 }}>
                                <ButtonCustom variant="yellow" style={{ heigth: 'fit-content' }}>
                                    <FavoriteIcon style={{ paddingRight: 5, width: 20, height: 15 }} /> <label style={{ whiteSpace: 'nowrap' }}>QUERO SER DOADOR</label>
                                </ButtonCustom>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    
                </Grid>

                <Grid item xs={2}></Grid>

                <Grid item xs={12} sm={5} style={{ fontSize: 30, padding: 15, paddingTop: 35, textAlign: 'center' }}>
                    Você é responsável por alguma instituição e está necessitando de recursos? Junte-se a nós!
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
                        <ButtonCustom variant="blueDark">
                            CADASTRAR INSTITUIÇÃO
                        </ButtonCustom>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ButtonCustom variant="green">
                        ACESSAR MINHA CONTA
                    </ButtonCustom>
                </Grid>

                <Grid item xs={12}>
                    <Grid container className={classes.footer}>
                        <Grid item xs={12} sm={2} style={{ fontSize: '.85rem' }}>
                            SOBRE A EQUIPE
                        </Grid>
                        <Grid item xs={12} sm={2} style={{ fontSize: '.85rem' }}>
                            CRÉDITOS
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
                </Grid>

            </Grid>
        );


}
