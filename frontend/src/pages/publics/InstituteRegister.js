import React from 'react';

//Material UI
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
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

import Cropper from 'react-easy-crop';
import WaitLoading from '../../components/WaitLoading';

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
import PhotoIcon from '@material-ui/icons/Photo';

//Components
import Card from "../../components/MaterialKit/Card/Card";
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";
import getCroppedImg from '../../components/cropImage';
import { Cities } from "../../components/Cities";
import MapRegister from '../../components/Map/MapRegister';
import ButtonNavigo from '../../components/Button';

import api, { sendRequest,getInstitutionTypes } from "../../services/api";
import { LatLng } from '../../components/LatLng'

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
    gridCard: {
        display: 'flex',
        justifyContent: 'center',
        height: 'fit-content'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgGrid: {
        border: '1px solid #10668B',
        '& label': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0',
            '&:hover': {
                filter: 'drop-shadow(2px 4px 6px gray)',
                cursor: 'pointer'
            }
        }
    },
    containerModal: {
        position: 'relative',
        height: '70vh',
        [theme.breakpoints.down('xs')]: {
            height: '70vh'
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '80vh',
        height: '80vh'
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
    const LatsLngs = LatLng()
    const itemsEstados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
                "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
                "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
    const [open, setOpen] = React.useState(false);
    const [waiting, setWaiting] = React.useState(false);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    //const [cropSize, setCropSize] = React.useState({ width: 439, height: 322 });
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const [centerMap, setCenterMap] = React.useState(null)
    
    const handleOpenModal = () => {
        setOpen(true);
    };
    
    const handleCloseModal = () => {
        setOpen(false);
    };
    
    const setCroppedImage = React.useCallback(async() => {
        try {
            const croppedImage = await getCroppedImg(
                avatar,
                croppedAreaPixels,
                0
            );
            setAvatarBlob(croppedImage);
            var imageFile = URL.createObjectURL(croppedImage);
            setAvatar(imageFile);
            handleCloseModal();
        } catch(e) {
            console.log(e);
        }
    });
    
    function getImage(e) {
        var tgt = e.target || window.e.srcElement, files = tgt.files;
        if(FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function() {
                setAvatar(fr.result);
            }
            fr.readAsDataURL(files[0]);
        } else {
            Swal.fire({
                title: "Aconteceu um problema. Tente novamente mais tarde ou entre em contato conosco!",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        handleOpenModal();
    }
    
    const [ screen,setScreen] = React.useState(0);
    const [ screen2,setScreen2] = React.useState(0);

    const [other,setOther] = React.useState(0);

    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const [nameResponsible, setNameResponsible] = React.useState('');
    const [CPF, setCPF] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [avatar, setAvatar] = React.useState(null);
    const [avatarBlob, setAvatarBlob] = React.useState(null);
    const [type,setType] = React.useState("");
    const [typeID, setTypeID] = React.useState("");
    const [types,setTypes] = React.useState(null);
    const [otherType,setOtherType] = React.useState(null);
    const [uf, setUF] = React.useState(null);
    const [citiesArray, setCitiesArray] = React.useState([]);
    const [city, setCity] = React.useState(null);
    const [longitude, setLongitude] = React.useState("");
    const [latitude, setLatitude] = React.useState("");
    

    async function loadData() {
        let res = await getInstitutionTypes()
        if(res) {
           setTypes(res.results);
        }
    }

    React.useEffect(() => {
        loadData();
    },[]);
    
    React.useEffect(() => {
        if (uf && city) {
            setCenterMap(LatsLngs[uf][city])
        }
    }, [city])

    const handleCoordinates = (lat, lng) => {
        setLatitude(lat)
        setLongitude(lng)
    }

    function handleChange (e){
        setType(e.target.value);
        setTypeID(types.filter(obj => { return obj.name === e.target.value })[0].id);

        if (e.target.value.toLowerCase()==="outro"){
            setOther(1)
        } else{
            setOther(0)
        }

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
        //Imagem vazia
        if(avatar === null) {
            Swal.fire({
                title: "Você precisa definir uma imagem de perfil!",
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
        //Tipo de Instituição Outro
        if(type === "Outro") {
            if(otherType === "") {
                Swal.fire({
                    title: "Este campo não pode ser vazio!",
                    text: "Tipo de Instituição",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
                return;
            }
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
        //Latitude vazio
        if(latitude === "") {
            Swal.fire({
                title: "Marque uma localização no mapa!",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }

        const formData = new FormData();
        formData.append("image", avatarBlob, "image.jpg");
        setWaiting(true)
        const response = await sendRequest('POST', "institutions/", { 
            owner: { name: nameResponsible, email, password1: password, cpf: CPF, typeUser: "R", phoneNumber: phone, uf, city},
            name,
            typeInstitution: typeID,
            otherType,
            description,
            uf,
            city,
            latitude,
            longitude
            }
        );
        setWaiting(false)

        if(response.status === 201) {
            Swal.fire({
                title: "Seu cadastro foi realizado com sucesso!",
                text: "Em breve seu registro será avaliado!",
                icon: 'success',
                confirmButtonText: 'Obrigado'
            }).then(() => {
                props.history.push('/login');
            });
            const id = response.data.id;
            api.patch(`institutions/${id}/`, formData).then(response => {
            }).then(err => {
                console.log(err);
            });
            
        } else {
            if(response.data.owner) {
                if(response.data.owner.cpf !== null) {
                    Swal.fire({
                        title: response.data.owner.cpf,
                        text: "CPF",
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    return;
                }
            }
            if(response.data.name !== null) {
                Swal.fire({
                    title: response.data.name,
                    text: "Nome Completo*",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }
            if(response.data.email !== null) {
                Swal.fire({
                    title: response.data.email,
                    text: "Email*",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }
            if(response.data.phoneNumber !== null) {
                Swal.fire({
                    title: response.data.phoneNumber,
                    text: "Telefone*",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }
            if(response.data.password1 !== null) {
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
                           <Grid container>                   
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
                screen2===0 ? (
                    <Grid item xs={12} className={classes.gridCard}>
                        <Card style={{width: "35rem"}}>
                            <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Instituição</CardHeader>
                            <CardBody style={{ paddingRight:15, paddingLeft:15}}>
                                <Grid container>
                                <input onChange={(e) => getImage(e)} accept="image/*" id="uploadAvatar" type="file" style={{ display: "none" }} />
                                    <Grid item xs={12} className={classes.imgGrid}>
                                        {avatar === null ? (
                                            <label htmlFor="uploadAvatar"> <PhotoIcon /> Clique aqui para adicionar uma foto</label>
                                        ) : (
                                            <label htmlFor="uploadAvatar" style={{ padding: 0 }}>
                                                <img src={avatar} alt="avatar" style={{ maxWidth: '45%', display: 'block', margin: 'auto' }} />
                                            </label>
                                        )}
                                        
                                    </Grid>
                                </Grid>
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
                                                ))
                                                 : <> </> }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                        {other === 1 ? 
                                            <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                                 <Grid item>
                                                    <TipoIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                                </Grid>
                                                <Grid item xs={10} sm={11}> 
                                                    <TextField onChange={e => setOtherType(e.target.value)} value={otherType} variant="standard" required fullWidth name="type" label="Tipo de Instituicão"  id="tipo" autoComplete="tipo"/>
                                                </Grid>   
                                            </Grid>    
                                        : <> </> }    

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
                                
                                <Grid container spacing={3} style={{paddingTop: 20, paddingBottom: 20}}>
                                    <Button onClick={() => setScreen(screen ? 0 : 1)} type="button" style={{ display: 'block', margin: 'auto', marginTop: 5, marginBottom: 5 }} color="primary">VOLTAR</Button>
                                    <Button onClick={() => setScreen2(screen2 ? 0 : 1)} type="button" style={{ display: 'block', margin: 'auto', marginTop: 5, marginBottom: 5 }} color="primary">CONTINUAR</Button>
                                </Grid> 
                            </CardBody>
                        </Card>
                    </Grid>   

                ):(
                    <Grid item xs={12} className={classes.gridCard}>
                        <Card style={{width: "35rem", height:"30rem"}}>
                            <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Instituição</CardHeader>
                            <CardBody style={{ paddingRight:15, paddingLeft:15}}>
                                <Grid container>
                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <h3 style={{ color: "#555",textAlign: 'center'}}>Digite o endereço da Instituição ou selecione no mapa</h3>
                                        <Grid item xs={12} >   
                                            <MapRegister center={centerMap} handleCoordinates={handleCoordinates}/>       
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardBody>
                            <Grid container spacing={3} style={{paddingTop: 25, paddingBottom: 10}}>
                                <Button onClick={() => setScreen2(screen2 ? 0 : 1)} type="button" style={{ display: 'block', margin: 'auto', marginTop: 5, marginBottom: 5, zIndex:1 }} color="primary">VOLTAR</Button>
                                <WaitLoading isLoading={waiting} type="spin" style={{ display: "block", height: "5%", width: "5%", margin: "auto", marginTop: 15, marginBottom: 15}}>
                                    <Button onClick={confirmRegister} type="button" style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15, zIndex:1 }} color="primary">FINALIZAR</Button>
                                </WaitLoading>
                            </Grid> 
                        </Card>
                    </Grid>        
                 )
                
            ) }

            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={open}>
                <div className={classes.paper}>
                    <div className={classes.containerModal}>
                    <Cropper
                        image={avatar}
                        crop={crop}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        aspect={6 / 4}
                    />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 6 }}>
                        <ButtonNavigo onClick={handleCloseModal} style={{ backgroundColor: 'red' }}>Cancelar</ButtonNavigo>
                        <ButtonNavigo onClick={setCroppedImage} variant="green">Confirmar</ButtonNavigo>
                    </div>
                </div>
                </Fade>
            </Modal>

        </Container>
       
    </Grid>
    
) 
        
    
}

