import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PhotoExample from '../../assets/PhotoExample.svg';

import { setUser } from "../../services/auth";

import { sendRequest } from "../../services/api";

const useStyles = makeStyles((theme) => ({
    containerRoot: {
        minHeight: '85vh',
        '& div': {
            height: 'fit-content'
        }
    },
    container: {
        height: 'fit-content'
    },
    titulo: {
        color: '#247BA0',
        display: 'block',
        fontWeight: 'bold',
        fontSize: '2rem',
        margin: '10% auto 5% auto',
        textAlign: 'center'
    },
    titulo1: {
        color: '#247BA0',
        display: 'block',
        fontWeight: 'bold',
        fontSize: '2rem',
        margin: '6% auto 5% auto',
        textAlign: 'center'
    },
    containerForm: {
        [theme.breakpoints.up('md')]: {
            marginTop: '4vh'
        }
    },
    buttonLeft: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end',
        }
    },
    buttonRight: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start',
        }
    }

}));

function PhoneMask(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/ , '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

function CPFMask(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
        
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

export default function MyProfile() {
    const classes = useStyles();
    const Swal = require('sweetalert2');
    const user = JSON.parse(localStorage.getItem('USER'));
    console.log(user);

    //Base
    const [screen, setScreen] = React.useState(0);
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);
    const [phone, setPhone] = React.useState(user.phoneNumber);
    const [password, setPassword] = React.useState('');
    const [newPassword1, setNewPassword1] = React.useState('');
    const [newPassword2, setNewPassword2] = React.useState('');

    //Institution
    const [nameResponsible, setNameResponsible] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [CPF, setCPF] = React.useState(user.cpf);

    async function handleUpdateProfile() {
        const response = await sendRequest("PATCH", "users/" + user.id + "/", { name, email, phoneNumber: phone });
        if(response.status === 200) {
            Swal.fire({
                title: "Seus dados foram atualizados!",
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setUser(response.data);
        }
    }

    async function handleChangePassword() {
        if(password === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Senha atual",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return
        }
        if(newPassword1 === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Nova senha",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return
        }
        if(newPassword2 === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Confirmar nova senha",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        if(newPassword1 !== newPassword2) {
            Swal.fire({
                title: "Os campos Nova Senha e Confirmar nova senha não estão iguais!",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }

        const response = await sendRequest('POST', "users/" + user.id + "/change_password/", { old_password: password, new_password1: newPassword1, new_password2: newPassword2 });
        
        if(response.status === 400) {
            //Senha curta
            if(response.data.new_password2) {
                Swal.fire({
                    title: "Esta senha é muito curta. Ela precisa conter pelo menos 8 caracteres!",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
                return;
            }
            //Senha atual incorreta
            if(response.data.old_password) {
                Swal.fire({
                    title: "A senha atual está incorreta!",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
                return;
            }
        }
        
        //Sucesso
        if(response.status === 200) {
            Swal.fire({
                title: "A senha foi atualizada com sucesso!",
                icon: "success",
                confirmButtonText: "Ok"
            });
        } else {
            Swal.fire({
                title: "Aconteceu um problema. Tente novamente mais tarde ou entre em contato conosco!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
        
    }

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                {user.typeUser === "Doador" ? (
                    
                <Container maxWidth="sm">
                    {screen===0 ? (
                    <Grid container spacing={4} className={classes.containerForm}>
                        <label className={classes.titulo}>Editar Perfil</label>
                        <Grid item xs={12}>
                            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} label="Nome Completo" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                            <Input
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={PhoneMask}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormControl>
                        </Grid>

                        <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                            <Button onClick={() => setScreen(1)} style={{ fontSize: '1.1rem', borderRadius: 10, backgroundColor: '#247BA0' }}>ALTERAR SENHA</Button>
                        </Grid>
                        <Grid item className={classes.buttonRight} xs={12} sm={6}>
                            <Button onClick={() => handleUpdateProfile()} style={{ display: 'block', fontSize: '1.2rem', borderRadius: 10, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
                        </Grid>

                    </Grid>

                    ) : (
                        <Grid container spacing={4} className={classes.containerForm}>
                            <label className={classes.titulo}>Alterar Senha</label>
                            <Grid item xs={12}>
                                <TextField fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Senha atual" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} label="Nova senha" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} label="Confirmar nova senha" />
                            </Grid>

                            <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                                <Button onClick={() => setScreen(0)} style={{ fontSize: '1.1rem', borderRadius: 10, backgroundColor: '#247BA0' }}>ALTERAR PERFIL</Button>
                            </Grid>
                            <Grid item className={classes.buttonRight} xs={12} sm={6}>
                                <Button onClick={() => handleChangePassword()} style={{ display: 'block', fontSize: '1.2rem', borderRadius: 10, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
                            </Grid>
                        </Grid>
                    )}
                    
                </Container>

                ) : (
                    
                <Container className={classes.container} maxWidth="lg">

                    <label className={classes.titulo1}>{screen===0 ? "Editar Perfil" : "Alterar Senha"}</label>
                    
                    {screen===0 ? (

                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <img src={PhotoExample} style={{ maxWidth: '100%' }} alt="profile" />
                        </Grid>
                        <Grid item xs={12} sm={8} style={{ border: '1px solid' }}>
                            Google Maps Frame
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth value={description} onChange={(e) => setDescription(e.target.value)} label="Breve descrição das atividades" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} label="Nome da Instituição" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth value={nameResponsible} onChange={(e) => setNameResponsible(e.target.value)} label="Nome do responsável" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="formatted-text-mask-input">CPF do responsável</InputLabel>
                                <Input
                                name="textmask"
                                value={CPF}
                                onChange={(e) => setCPF(e.target.value)}
                                inputComponent={CPFMask}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                                <Input
                                name="textmask"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                inputComponent={PhoneMask}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                            <Button onClick={() => setScreen(1)} style={{ fontSize: '1.1rem', borderRadius: 10, backgroundColor: '#247BA0' }}>ALTERAR SENHA</Button>
                        </Grid>
                        <Grid item className={classes.buttonRight} xs={12} sm={6}>
                            <Button style={{ display: 'block', fontSize: '1.2rem', borderRadius: 10, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
                        </Grid>
                    </Grid>

                    ) : (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField fullWidth value={password} onChange={(e) => setPassword(e.target.value)} label="Senha atual" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} label="Nova senha" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} label="Confirmar nova senha" />
                            </Grid>

                            <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                                <Button onClick={() => setScreen(0)} style={{ fontSize: '1.1rem', borderRadius: 10, backgroundColor: '#247BA0' }}>EDITAR PERFIL</Button>
                            </Grid>
                            <Grid item className={classes.buttonRight} xs={12} sm={6}>
                                <Button style={{ display: 'block', fontSize: '1.2rem', borderRadius: 10, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
                            </Grid>
                        </Grid>
                    )}
                </Container>

                )}
            </Grid>
        </Grid>
        
    );
}
