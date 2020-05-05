import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//ICONS
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import CpfIcon from '@material-ui/icons/AssignmentInd';
import InstituicaoIcon from '@material-ui/icons/AccountBalance';
import CallIcon from '@material-ui/icons/Call';
import TipoIcon from '@material-ui/icons/HomeWork';
import DescricaoIcon from '@material-ui/icons/BorderColorOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';


import Card from "../../components/MaterialKit/Card/Card";
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";
import { Cities } from "../../components/Cities";
import MapRegister from '../../components/Map/MapRegister'

import { sendRequest,getInstitutionTypes } from "../../services/api";



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
  
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: '#e5e5e5'
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
          padding: 50
      },

      text: {
        paddingTop:"50%",
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
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


export default function CadastroInstituicao({props}) {
    const classes = useStyles();
    const Swal = require('sweetalert2');
    const cities = Cities();
    const itemsEstados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
                "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
                "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
    
    const [ screen,setScreen] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const [nameResponsible, setNameResponsible] = React.useState('');
    const [CPF, setCPF] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [type,setType] = React.useState("");
    const [typeID, setTypeID] = React.useState("");
    const [types,setTypes] = React.useState(null);
    const [uf, setUF] = React.useState("");
    const [citiesArray, setCitiesArray] = React.useState([]);
    const [city, setCity] = React.useState("");
    const [linkFacebook, setLinkFacebook] = React.useState(null);
    const [linkInstagram, setLinkInstagram] = React.useState(null);
    const [linkTwitter, setLinkTwitter] = React.useState(null);

    const [openMapa, setOpenMapa] = React.useState(false)

    async function loadData() {
        let res = await getInstitutionTypes()
        if(res) {
           setTypes(res.results);
           console.log(types);
        }
        
    }

    React.useEffect(() => {
        loadData();
    }, []);


    function handleChange (e){
        setType(e.target.value);
        setTypeID(types.filter(obj => { return obj.name === e.target.value })[0].id);
    }

    function handleSelectCities(e) {
        setUF(e.target.value);
        setCitiesArray(cities[e.target.value].cidades);
    }

    async function confirmRegister(e) {
        e.preventDefault();

        //Nome completo do responsável vazio
        if(nameResponsible === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Nome completo do responsável",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //CPF vazio
        if(CPF === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "CPF",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Email vazio
        if(email === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Email",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Senha vazio
        if(password === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Senha de acesso",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Confirmar senha vazio
        if(confirmPassword === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Confirmar senha de acesso",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Senhas não correspondem
        if(password !== confirmPassword) {
            Swal.fire({
                title: "Os campos de senha não correspondem:",
                text: "Senha de acesso e Confirmar senha de acesso",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Nome da Instituição vazio
        if(name === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Nome da Instituição",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Telefone vazio
        if(phone === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Telefone",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
        //Tipo de Instituição vazio
        if(type === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Tipo de Instituição",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Breve descrição vazio
        if(description === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Breve descrição",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Estado vazio
        if(uf === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Estado",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Cidade vazio
        if(city === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Cidade",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        

        const response = await sendRequest('POST', "institutions/", { 
            owner: { name: nameResponsible, email, password1: password, cpf: CPF, typeUser: "R", phoneNumber: phone},
            name,
            typeInstitution: typeID,
            description,
            latitude: "Arrumar depois",
            longitude: "Arrumar depois",
            uf,
            city,
            linkFacebook, linkInstagram,
            linkTwitter,
            }
        );

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
            if(response.data.owner.cpf) {
                Swal.fire({
                    title: response.data.owner.cpf,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }
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
            { screen === 0 ? (
                   <Grid item xs={12} className={classes.gridCard}>
                   <Card style={{width: "35rem"}}>
                       <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Instituição</CardHeader>
                       <CardBody style={{ paddingRight:15, paddingLeft:15}}>
                           <Grid container >                   
                               <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                   <Grid item>
                                       <FaceIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                   </Grid>
                                   <Grid container  item xs={10} sm={11}>
                                       <TextField   onChange={e => setNameResponsible(e.target.value)}
                                          variant="standard" required fullWidth  name="nome" value={nameResponsible} label="Nome completo do responsável" autoComplete="nome"/>
                                   </Grid>
                               </Grid>

                               <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                   <Grid item>
                                       <CpfIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                   </Grid>
                                        <Grid item xs={10} sm={11}>
                                        <FormControl fullWidth>
                                        <InputLabel required htmlFor="formatted-text-mask-input">CPF do responsável</InputLabel>
                                        <Input
                                        name="textmask"
                                        value={CPF}
                                        onChange={(e) => setCPF(e.target.value)}
                                        inputComponent={CPFMask}
                                        />
                                    </FormControl>
                                   </Grid>
                               </Grid>

                               <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                   <Grid item>
                                       <EmailIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                   </Grid>
                                   <Grid item xs={10} sm={11}>
                                       <TextField  onChange={e => setEmail(e.target.value)} value={email} variant="standard" required fullWidth id="email" label="Email" name="email" autoComplete="email"/>
                                   </Grid>
                               </Grid>

                               <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                   <Grid item>
                                       <LockIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                   </Grid>
                                   <Grid item xs={10} sm={11}>
                                       <TextField  onChange={e => setPassword(e.target.value)} value={password} variant="standard" required fullWidth name="password" label="Senha de acesso" type="password" id="password" autoComplete="current-password"/>
                                   </Grid>
                               </Grid>

                               <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                   <Grid item>
                                       <LockIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                   </Grid>
                                   <Grid item xs={10} sm={11}>
                                       <TextField  onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} variant="standard" required fullWidth label="Confirmar senha de acesso" type="password" id="password" autoComplete="current-password"/>
                                   </Grid>
                               </Grid>

                           </Grid>
                           <Button onClick={() => setScreen(screen ? 0 : 1)} type="button" style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15 }} color="primary">CONTINUAR</Button>
                       </CardBody>
                   </Card>
               </Grid>            
            ): (
                <Grid item xs={12} className={classes.gridCard}>
                        <Card style={{width: "35rem"}}>
                            <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Instituição</CardHeader>
                            <CardBody style={{ paddingRight:15, paddingLeft:15}}>
                                <Grid container>
                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <InstituicaoIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <TextField  onChange={e => setName(e.target.value)} value={name} variant="standard" required fullWidth id="nome" label="Nome da Instituição" name="instituicao" autoComplete="nome"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <CallIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                                <Grid item xs={10} sm={11}>
                                                <FormControl fullWidth>
                                                <InputLabel required htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                                                <Input
                                                name="textmask"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                inputComponent={PhoneMask} />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <TipoIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <FormControl fullWidth>
                                                <InputLabel>Tipo de Instituição</InputLabel>
                                                <Select value={type} onChange={handleChange} input={<Input />}>    
                                                { types ? types.map((type) => (
                                                    <MenuItem key={type.id} value={type.name}>
                                                    {type.name}
                                                    </MenuItem>
                                                )) : <> </> }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <DescricaoIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                        <Grid container item xs={10} sm={11}>
                                            <TextField onChange={e => setDescription(e.target.value)} value={description} variant="standard" required fullWidth name="descricao" label="Breve descrição"  id="descricao" autoComplete="descricao"/>
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
                                </Grid>

                            
                                <label style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', fontSize: '1.2rem', paddingTop: 10, marginBottom: "-13px" }}>Redes Sociais</label>

                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <FacebookIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField  onChange={e => setLinkFacebook(e.target.value)} value={linkFacebook} variant="standard" fullWidth label="Facebook" name="instituicao"/>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <InstagramIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField  onChange={e => setLinkInstagram(e.target.value)} value={linkInstagram} variant="standard" fullWidth label="Instagram" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                    <Grid item>
                                        <TwitterIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <TextField  onChange={e => setLinkTwitter(e.target.value)} value={linkTwitter} variant="standard" fullWidth label="Twitter"/>
                                    </Grid>
                                </Grid>
                                
                                <Grid container spacing={3}>
                                    <Button onClick={() => setScreen(screen ? 0 : 1)} type="button" style={{ display: 'block', margin: 'auto', marginTop: 5, marginBottom: 5 }} color="primary">VOLTAR</Button>
                                    <Button onClick={confirmRegister} type="button" style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15 }} color="primary">FINALIZAR</Button>
                                </Grid> 

                            </CardBody>
                        </Card>
                    </Grid>                          
            ) }      
        </Container>
       
    </Grid>
    
) 
        
    
}

