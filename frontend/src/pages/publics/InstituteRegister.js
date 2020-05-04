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
import LocationIcon from '@material-ui/icons/LocationOn';
import Modal from '@material-ui/core/Modal';

import Card from "../../components/MaterialKit/Card/Card";
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";
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
    const institution = {
        name: "Educandário BCA",
        phone: "(68) 4002-8922",
        email: "educandariobca@gmail.com",
        donated: [
            { name: "Produtos de limpeza"},
            { name: "Cestas básicas"},
            { name: "Alimentos não perecíveis"}
        ],
        lat: '67.82543436532767',
        long: '9.970694704824691'
    }
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d982.3893816689978!2d-"+institution.lat+"!3d-"+institution.long+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e2!4m3!3m2!1d-"+institution.long+"!2d-"+institution.lat+"!4m3!3m2!1d-"+institution.long+"!2d-"+institution.lat+"!5e0!3m2!1spt-BR!2sbr!4v1588062121261!5m2!1spt-BR!2sbr"

    const Swal = require('sweetalert2');

    const [ screen,setScreen] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const [nameResponsible, setNameResponsible] = React.useState('');
    const [CPF, setCPF] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [type,setType] = React.useState("");
    const [types,setTypes] = React.useState(null);
    const [openMapa, setOpenMapa] = React.useState(false)

    async function loadData() {
        let res = await getInstitutionTypes()
        if(res) {
           setTypes(res.results)
           console.log(types)
          
        }
        
    }

    React.useEffect(() => {
        //loadData();
    }, [loadData]);


    function handleChange (e){
        setType(e.target.value)
    }

    async function confirmRegister(e) {
        e.preventDefault();
        const response = await sendRequest('POST', "users/", { name:nameResponsible, email,CPF, password1: password, phoneNumber:phone, typeUser: "R" });

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
            { screen === 0 ? (
                   <Grid item xs={12}  justify="center" className={classes.gridCard}>
                   <Card style={{width: "35rem"}}>
                       <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Instituição</CardHeader>
                       <CardBody style={{ paddingRight:15, paddingLeft:15}}>
                           <Grid container >                   
                               <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                   <Grid item>
                                       <FaceIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                   </Grid>
                                   <Grid container  item xs={10} sm={18}>
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
                                        <InputLabel htmlFor="formatted-text-mask-input">CPF do responsável</InputLabel>
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

                           </Grid>
                           <Button onClick={() => setScreen(screen ? 0 : 1)} type="button" style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15 }} color="primary">CONTINUAR</Button>
                       </CardBody>
                   </Card>
               </Grid>            
            ): (
                <Grid item xs={12}  justify="center" className={classes.gridCard}>
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
                                                <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
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
                                            <TextField   onChange={e => setDescription(e.target.value)} value={description} variant="standard" required fullWidth name="descricao" label="Breve descrição"  id="descricao" autoComplete="descricao"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <LocationIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                        <Grid container item xs={10} sm={11}>
                                             <label style={{ color: "#555"}}>Localização da Instituição</label>
                                        </Grid>
                                        <Grid container item xs={10} sm={11}>
                                             <Button onClick={() => setOpenMapa(true)}> Abrir Mapa</Button>
                                        </Grid>
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
        <Modal open={openMapa} className={classes.modal} onClose={() => setOpenMapa(false)} >
            <div className={classes.paper2}>
                <MapRegister />
            </div>
        </Modal>
    </Grid>
    
) 
        
    
}

