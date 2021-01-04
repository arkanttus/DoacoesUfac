import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//Services
import { sendRequest } from "../../services/api";
//Components
import Button from "../../components/Button";

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '95vh',
        flexWrap: 'initial',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10vh',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            minHeight: '90vh',
            paddingTop: '8vh'
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
    input: {
        height: 50,
        width: '-webkit-fill-available; width: -moz-available',
        margin: '10px 0px',
        borderRadius: 25,
        fontSize: 18,
        display: 'block',
        paddingLeft: 20,
        border: 'none',
        outline: 'none',
        [theme.breakpoints.up('lg')]: {
            fontSize: 24,
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: 28,
            paddingLeft: 46
        },
        '&::placeholder': {
            color: '#B7B4B4',
            fontWeight: '300'
        },
        '&:focus': {
            boxShadow: '0 0 0 2pt #27496D'
        }
    },
    textArea: {
        resize: 'none',
        paddingTop: 20,
        paddingLeft: 20,
        borderRadius: 25,
        width: '-webkit-fill-available; width: -moz-available',
        fontSize: 18,
        border: 'none',
        outline: 'none',
        [theme.breakpoints.up('lg')]: {
            fontSize: 24,
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: 28,
            paddingLeft: 46
        },
        '&::placeholder': {
            color: '#B7B4B4',
            fontWeight: '300'
        },
        '&:focus': {
            boxShadow: '0 0 0 2pt #27496D'
        }
    },
    border: {
        padding: '1rem'
    }
}));

const Input = (props) => (
    <input
    type={props.type}
    placeholder={props.placeholder}
    className={useStyles().input}
    style={props.style}
    onChange={props.onChange}
    />
)

export default function Contact({props}) {
    console.log(props.history.location.pathname);
    const classes = useStyles();
    const Swal = require('sweetalert2');
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");

    async function sendMessage() {
        if(name === "") {
            Swal.fire({
                title: "Este campo não pode ser em branco!",
                text: "Seu nome",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return
        }
        if(email === "") {
            Swal.fire({
                title: "Este campo não pode ser em branco!",
                text: "Email",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return
        }
        if(subject === "") {
            Swal.fire({
                title: "Este campo não pode ser em branco!",
                text: "Título",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return
        }
        if(message === "") {
            Swal.fire({
                title: "Este campo não pode ser em branco!",
                text: "Mensagem",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return
        }

        Swal.fire({
            title: "Sua mensagem foi enviada",
            text: "Mensagem",
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            props.history.push('/');
        });
        
    }

    return(
        <Grid container className={classes.container}>
            <Grid container style={{ maxWidth: 960 }}>
                <Grid item xs={12} sm={6} className={classes.border}>
                    <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Seu nome" />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.border}>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                </Grid>
                <Grid item xs={12} className={classes.border}>
                    <Input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" placeholder="Título" />
                </Grid>
                <Grid item xs={12} className={classes.border}>
                    <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    rows="10"
                    className={classes.textArea}
                    placeholder="Mensagem">{message}</textarea>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="green" onClick={sendMessage} style={{ width: 'fit-content', display: 'block', margin: '1em auto', fontSize: '1.2rem', padding: '10px 40px' }}>Enviar</Button>
                </Grid>
            </Grid>
                 
        </Grid>
    );
}