import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
//Img
import DaricelioImg from '../../assets/team/member10.jpg';
import AldirImg from '../../assets/team/member3.jpeg';
import BarbaraImg from '../../assets/team/member2.jpeg';
import LeoImg from '../../assets/team/member1.jpeg';
import LucasImg from '../../assets/team/member4.jpeg';
import AndrielleImg from '../../assets/team/member9.jpeg';
import BrunoImg from '../../assets/team/member5.jpeg';
import JhonatanImg from '../../assets/team/member7.jpg';
import ItaloImg from '../../assets/team/member8.jpeg';
import ThalissonImg from '../../assets/team/member6.jpg';

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
    text: {
        padding:"0 30%",
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        paddingTop: 35,
        '&:hover': {
            color: '#e5e5e5'
        }
    },
    imgMember: {
        borderRadius: '50%',
        width: 190,
        height: 190,
        display: 'block',
        margin: 'auto'
    }
}));


export default function HowToDonate() {
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>

            <Grid container justify="center">
                <Grid item container  justify="center" xs={12} alignItems="center">
                    <Typography variant="h4" align="center">
                        <Box fontWeight="fontWeightMedium" m={1}>
                            SOBRE A EQUIPE
                        </Box>
                    </Typography>
                </Grid>
            </Grid>

            <Grid container style={{  display:"flex",  justifyContent:"center",textAlign:"center"}}>   
               <Grid container className={classes.text}>
                   
                    <label style={{  fontSize: 22} }>
                            <p>
                                Este é um projeto de causa social desenvolvido por discentes e docentes da Universidade Federal do Acre dos cursos de Medicina e Sistemas de Informação.
                            </p>
                    </label>
                </Grid>       
            </Grid>

            <Grid container>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <a href="https://daricelio.github.io/" target="_blank" className={classes.noLinkStyle}>
                        <img src={DaricelioImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Professor Dr. Daricélio Moreira Soares</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href="https://github.com/andriellelima" target="_blank" className={classes.noLinkStyle}>
                        <img src={AndrielleImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Andrielle Lima</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <a href="https://www.instagram.com/aldirfi/?igshid=tszcqdq74t60" target="_blank" className={classes.noLinkStyle}>
                        <img src={AldirImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Aldir Filho</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href="https://instagram.com/babiolivv?igshid=85nxdi50a6fm" target="_blank" className={classes.noLinkStyle}>
                        <img src={BarbaraImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Bárbara Oliveira</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href="https://github.com/bruunotrindade" target="_blank" className={classes.noLinkStyle}>
                        <img src={BrunoImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Bruno Trindade</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href="https://github.com/arkanttus" target="_blank" className={classes.noLinkStyle}>
                        <img src={ItaloImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Ítalo Oliveira</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href="https://github.com/JhonatanPatrocinio" target="_blank" className={classes.noLinkStyle}>
                        <img src={JhonatanImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Jhonatan Patrocínio</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href="https://www.instagram.com/leonardmes/?igshid=1ut8f6914afvv" target="_blank" className={classes.noLinkStyle}>
                        <img src={LeoImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Leonard Medeiros</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href="https://www.instagram.com/llucas_r_a/?igshid=4lmdgza2hyfp" target="_blank" className={classes.noLinkStyle}>
                        <img src={LucasImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Lucas Angat</h5>
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href="https://github.com/Tony-Starkus" target="_blank" className={classes.noLinkStyle}>
                        <img src={ThalissonImg} className={classes.imgMember} />
                        <h5 style={{ fontSize: 18, textAlign: 'center' }}>Thalisson Bandeira</h5>
                    </a>
                </Grid>
            </Grid>

        </Grid>
    );
}