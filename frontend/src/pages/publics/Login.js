import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

import Card from "../../components/MaterialKit/Card/Card";
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";
import WaitLoading from '../../components/WaitLoading';
import { sendRequest } from "../../services/api";
import { login } from "../../services/auth";

import Modal from '@material-ui/core/Modal';

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
    button : {
        display: 'block',
        margin: 'auto'
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
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper2: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      gridButton: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
      }

}));

export default function Login({ props }) {
    const classes = useStyles();
    const Swal = require('sweetalert2');

    const [ email, setEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [ open, setOpen ] = React.useState(false);
    const [ waiting, setWaiting ] = React.useState(false);
  
    async function validateForm(e) {
        e.preventDefault()
        setWaiting(true)
        //const response = await sendRequest("POST", "login/", { username: email, password })
        setWaiting(false)
        await login( email, password )
        props.history.push("/dashboard")
    }

    return(
        <Grid container className={classes.container}>
            <Container component="main" maxWidth="sm" style={{ display: 'flex', flexDirection: 'column' }}>
                <CssBaseline />
                <Grid item xs={12} className={classes.gridCard}>
                    <Card style={{width: "35rem"}}>
                        <CardHeader style={{ textAlign: 'center', fontSize: 20, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', color: '#FFF', marginLeft: 0, marginRight: 0 }}>LOGIN</CardHeader>
                        <CardBody>
                            <form onSubmit={validateForm}>
                                <Grid container>
                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <EmailIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <TextField variant="standard" required fullWidth id="email" label="Email" name="email" autoComplete="email" value={email} onChange={e => { setEmail(e.target.value) }}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <LockIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <TextField variant="standard" required fullWidth name="password" label="Senha de acesso" type="password" id="password" autoComplete="current-password" value={password} onChange={e => { setPassword(e.target.value) }}/>
                                        </Grid>
                                 
                                    </Grid>
                                </Grid>
                                <WaitLoading isLoading={waiting} type="spin" style={{ display: "block", height: "5%", width: "5%", margin: "auto", marginTop: 15, marginBottom: 15}}>
                                    <Button type="submit" style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15 }} color="primary">ENTRAR</Button>
                                </WaitLoading>
                            </form>
                        </CardBody>
                    </Card>
                </Grid>
                <Grid item xs={12} className={classes.gridButton}>
                    <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => props.history.push('/doador')}>Quero ser doador</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ padding: 5 }}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => props.history.push('/instituicao')}>Seja uma instituição</Button>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}