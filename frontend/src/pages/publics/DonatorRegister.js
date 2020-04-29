import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';

import Card from "../../components/MaterialKit/Card/Card";
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";


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
    },
    mainCard: {
        backgroundColor: "#FFF"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        backgroundColor: "#FFF",
        padding: "60px 50px 10px 50px"
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#9C27B0",
      },
      gridCard: {
          display: 'flex',
          justifyContent: 'center',
          height: 'fit-content'
      },
      containerCardBody: {
          padding: 0
      }

}));

export default function CadastroInstituicao() {
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>
            <Container component="main" maxWidth="sm" style={{ display: 'flex', alignItems: 'center' }}>
                <CssBaseline />
                <Grid item xs={12}  justify="center" className={classes.gridCard}>
                    <Card style={{width: "35rem"}}>
                        <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Doador</CardHeader>
                        <CardBody>
                            <Grid container>
                                
                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <FaceIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField variant="standard" required fullWidth id="nome" label="Nome completo" autoComplete="nome"/>
                                    </Grid>
                                </Grid>
                                
                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <EmailIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField variant="standard" required fullWidth id="email" label="Email" name="email" autoComplete="email"/>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <LockIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField variant="standard" required fullWidth name="password" label="Senha de acesso" type="password" id="password" autoComplete="current-password"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15 }} color="primary">FINALIZAR</Button>
                        </CardBody>
                    </Card>
                </Grid>
                
            </Container>
        </Grid>
    );
}