import React from 'react';
//Material UI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//Icons Material UI
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';

//Components
import Card from "../../components/MaterialKit/Card/Card";
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";
import { Cities } from "../../components/Cities";

import { sendRequest, getInstitutionTypes } from "../../services/api";
import WaitLoading from '../../components/WaitLoading';


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

export default function CadastroInstituicao({ props }) {
    const cities = Cities();
    const itemsEstados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
    "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]

    const classes = useStyles();
    const Swal = require('sweetalert2');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [uf, setUF] = React.useState("");
    const [citiesArray, setCitiesArray] = React.useState([]);
    const [city, setCity] = React.useState("");
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [waiting, setWaiting] = React.useState(false);

    function handleSelectCities(e) {
        setUF(e.target.value);
        setCity("");
        setCitiesArray(cities[e.target.value].cidades);
    }

    async function confirmRegister(e) {
        e.preventDefault();

        if(uf === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Estado",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        if(city === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Cidade!",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        if(password === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Senha de acesso",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        if(confirmPassword === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Confirmar senha de acesso",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        if(password !== confirmPassword) {
            Swal.fire({
                title: "As senhas não correspondem!",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        setWaiting(true)
        const response = await sendRequest('POST', "users/", { name, email, password1: password, phoneNumber, typeUser: "D", uf, city });
        setWaiting(false)

        if(response.status === 201) {
            Swal.fire({
                title: "Seu cadastro foi realizado com sucesso!",
                text: "Você será redirecionado para a página de Login!",
                icon: 'success',
                confirmButtonText: 'Obrigado'
            }).then(() => {
                props.history.push('/login');
            });
            
        } else {
            if(response.data.name) {
                Swal.fire({
                    title: response.data.name,
                    text: "Nome Completo*",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }
            if(response.data.email) {
                Swal.fire({
                    title: response.data.email,
                    text: "Email*",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }
            if(response.data.phoneNumber) {
                Swal.fire({
                    title: response.data.phoneNumber,
                    text: "Telefone*",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }
            if(response.data.password1) {
                Swal.fire({
                    title: response.data.password1,
                    text: "Senha de acesso*",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }
            Swal.fire({
                title: 'Algo de errado aconteceu. Por favor tente novamente mais tarde!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

    }

    return(
        <Grid container className={classes.container}>
            <Container component="main" maxWidth="sm" style={{ display: 'flex', alignItems: 'center' }}>
                <CssBaseline />
                <Grid item xs={12} className={classes.gridCard}>
                    <Card style={{width: "35rem"}}>
                        <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Doador</CardHeader>
                        <CardBody>
                            <Grid container>
                                
                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <FaceIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField value={name} onChange={(e) => setName(e.target.value)} variant="standard" required fullWidth label="Nome completo" autoComplete="nome"/>
                                    </Grid>
                                </Grid>
                                
                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <EmailIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" required fullWidth id="email" label="Email" autoComplete="email" />
                                    </Grid>
                                </Grid>

                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <PhoneIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                                        <Input
                                        name="textmask"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        inputComponent={PhoneMask}
                                        />
                                    </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <LocationOnIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <FormControl fullWidth>
                                            <InputLabel>Estado *</InputLabel>
                                            <Select value={uf} onChange={handleSelectCities} input={<Input />}>    
                                            {itemsEstados.map((item) => (
                                                <MenuItem key={item} value={item}>
                                                {item}
                                                </MenuItem>
                                            ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <GpsFixedIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <FormControl fullWidth>
                                            <InputLabel>Cidade *</InputLabel>
                                            <Select value={city} onChange={(e) => setCity(e.target.value)} input={<Input />}>    
                                            {citiesArray ? (citiesArray.map((item) => (
                                                <MenuItem key={item} value={item}>
                                                {item}
                                                </MenuItem>
                                            ))) : (
                                                <></>
                                            )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <LockIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} variant="standard" required fullWidth label="Senha de acesso" type="password" />
                                    </Grid>
                                </Grid>
                                
                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <LockIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} variant="standard" required fullWidth label="Confirmar senha de acesso" type="password" />
                                    </Grid>
                                </Grid>

                            </Grid>
                            <WaitLoading isLoading={waiting} type="spin" style={{ display: "block", height: "5%", width: "5%", margin: "auto", marginTop: 15, marginBottom: 15}}>
                                <Button onClick={(e) => confirmRegister(e)} style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15 }} color="primary">FINALIZAR</Button>
                            </WaitLoading>
                        </CardBody>
                    </Card>
                </Grid>
                
            </Container>
        </Grid>
    );
}