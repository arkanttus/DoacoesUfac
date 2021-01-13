import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PhotoExample from '../../assets/PhotoExample.svg';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../../components/Button';
import Cropper from 'react-easy-crop';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import InstitutionImage from "../../assets/Image.png";

import getCroppedImg from '../../components/cropImage';
import { setUser, setInstitution, getUser, getInstitution } from '../../services/auth';
import { Cities } from "../../components/Cities";
import api, { sendRequest, getInstitutionTypes } from "../../services/api";
import { LatLng } from '../../components/LatLng'

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import MapRegister from '../../components/Map/MapRegister';

const useStyles = makeStyles((theme) => ({
    containerRoot: {
        minHeight: '85vh',
    },
    container: {
        height: 'fit-content',
        maxWidth: "850px"
    },
    titulo: {
        display: 'block',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '2rem',
        color: '#247BA0',
        padding: '4vh 0vh 4vh 0vh'
    },
    buttonLeft: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end',
            padding: '20px 20px 4px 0px!important',
        }
    },
    buttonRight: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start',
            padding: '20px 0px 4px 20px!important'
        }
    },
    socialMediaIcon: {
        color: "#555",
        marginLeft: -8,
        marginRight: 5,
        paddingLeft: 5,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    divAvatar: {
        cursor: 'pointer',
        '& label': {
            cursor: 'pointer',
        },
        '&:hover': {
            filter: 'brightness(0.5)',
        }
    },
    mapa: {
        width: '100%',
        height: 'inherit',
        position: 'absolute'
    },
    btnPassword: {
        fontSize: '1.1rem', 
        borderRadius: 3, 
        backgroundColor: '#247BA0',
        "&:focus": {
            background: '#0276aa',
            color: '#ccc'
        }
    },
    btnOk: {
        display: 'block', 
        fontSize: '1.2rem', 
        borderRadius: 3, 
        backgroundColor: '#008B00',
        "&:focus": {
            background: '#357a38',
            color: '#ddd'
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

export default function ProfileEditInstitution() {
    const classes = useStyles();
    const user = getUser();
    const LatsLngs = LatLng()
    const Swal = require('sweetalert2');
    const institution = getInstitution();
    const cities = Cities();
    const itemsEstados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
                "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
                "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
    const [screen, setScreen] = React.useState(0);
    const [newAvatar, setNewAvatar] = React.useState();
    const [institutionAvatar, setInstitutionAvatar] = React.useState(institution.image);
    const [description, setDescription] = React.useState(institution.description);
    const [name, setName] = React.useState(institution.name);
    const [typesInstitutions,setTypesInstitutions] = React.useState([
        { id: 1, name: "Azilo" },
        { id: 2, name: "Escola" },
        { id: 3, name: "Igreja" },
        { id: 4, name: "Centro de Ensino" },
        { id: 5, name: "Outro" },
    ]);
    const [typeInstitutionName, setTypeInstitutionName] = React.useState("Centro de Ensino");
    const [typeInstitutionID, setTypeInstitutionID] = React.useState("");
    const [otherType, setOtherType] = React.useState(institution.otherType);
    const [nameResponsible, setNameResponsible] = React.useState(user.name);
    const [uf, setUF] = React.useState(itemsEstados.filter(obj => {return obj === institution.uf})[0]);
    const [citiesArray, setCitiesArray] = React.useState(cities[institution.uf].cidades);
    const [city, setCity] = React.useState(institution.city);
    const [linkFacebook, setLinkFacebook] = React.useState(institution.linkFacebook);
    const [linkInstagram, setLinkInstagram] = React.useState(institution.linkInstagram);
    const [linkTwitter, setLinkTwitter] = React.useState(institution.linkTwitter);
    const [latitude, setLatitude] = React.useState(institution.latitude)
    const [longitude, setLongitude] = React.useState(institution.longitude)
    const [CPF, setCPF] = React.useState(user.cpf);
    const [email, setEmail] = React.useState(user.email);
    const [phone, setPhone] = React.useState(user.phoneNumber);
    const [password, setPassword] = React.useState('');
    const [newPassword1, setNewPassword1] = React.useState('');
    const [newPassword2, setNewPassword2] = React.useState('');
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    //const [cropSize, setCropSize] = React.useState({ width: 439, height: 322 });
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
    const [coordinates, setCoordinates] = React.useState(null)

    React.useEffect(() => {
        setCoordinates(LatsLngs[uf][city])
    }, []);

    React.useEffect(() => {
        setCoordinates(LatsLngs[uf][city])
    }, [city])

    const handleCoordinates = (lat, lng) => {
        setLatitude(lat)
        setLongitude(lng)
    }

    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const setCroppedImage = React.useCallback(async() => {
        try {
            const croppedImage = await getCroppedImg(
                newAvatar,
                croppedAreaPixels,
                0
            );

            //const data = response.data
            Swal.fire({
                title: "Sua foto foi atualizada!",
                icon: "success",
                confirmButtonText: "Ok"
            });
            setInstitutionAvatar(croppedImage);
            setNewAvatar(null);
            handleCloseModal();
        } catch(e) {
            console.log(e);
        }
    });

    const [open, setOpen] = React.useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    function handleSelectCities(e) {
        setUF(e.target.value);
        setCity("");
        setCitiesArray(cities[e.target.value].cidades);
    }

    function handleSelectInstitutionType (e){
        setTypeInstitutionName(e.target.value);
        setTypeInstitutionID(typesInstitutions.filter(obj => { return obj.name === e.target.value })[0].id);
    }
    //Atualizar perfil
    async function handleUpdateProfile() {

        //Descrição vazia
        if(description === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Breve descrição das atividade",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        //Nome vazio
        if(name === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Nome da Instituição",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
        //Nome do responsável vazio
        if(nameResponsible === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Nome da Instituição",
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
        //Outro tipo de instituição
        if(typeInstitutionName === "Outro") {
            if(otherType === null || otherType === "") {
                Swal.fire({
                    title: "Este campo não pode ser vazio!",
                    text: "Tipo de Instituição",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
                return;
            }
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

        Swal.fire({
            title: "Seus dados foram atualizados!",
            icon: "success",
            confirmButtonText: "Ok"
        });

    }//Atualizar perfil

    //Atualizar senha
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
                title: "Os campos Nova Senha e Confirmar nova senha não correspondem!",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }

        if(password !== user.password) {
            Swal.fire({
                title: "Senha atual incorreta!",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }

        Swal.fire({
            title: "A senha foi atualizada com sucesso!",
            icon: "success",
            confirmButtonText: "Ok"
        });
        setPassword("");
        setNewPassword1("");
        setNewPassword2("");
    }//Atualizar senha

    function getImage(e) {
        var tgt = e.target || window.e.srcElement, files = tgt.files;
        if(FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function() {
                setNewAvatar(fr.result);
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
    
    return(
        <Grid container className={classes.containerRoot}>
            <Container className={classes.container} maxWidth="lg">
                <label className={classes.titulo}>Edição de Conta</label>
                
                {screen===0 ? (

                <Grid container spacing={2}>
                    <input onChange={(e) => getImage(e)} accept="image/*" id="uploadAvatar" type="file" style={{ display: "none" }} />
                    <Tooltip title="Clique para alterar a foto" arrow>
                        <Grid item xs={12} sm={4} className={classes.divAvatar} style={{ display: 'block', margin: 'auto' }}>
                            <label htmlFor="uploadAvatar">
                                {institutionAvatar !== null ? (
                                    <img src={InstitutionImage} style={{ maxWidth: '100%' }} alt="profile" />
                                    
                                ) : (
                                    <img src={InstitutionImage} style={{ maxWidth: '100%' }} alt="profile" />
                                )}
                            </label>
                        </Grid>
                    </Tooltip>
                    
                    <Grid item xs={12}>
                        <TextField fullWidth required value={name} onChange={(e) => setName(e.target.value)} label="Nome da Instituição" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth required multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} label="Breve descrição das atividades" />
                    </Grid>

                    {typeInstitutionName !== "Outro" ? (
                        <Grid container spacing={2} style={{ padding: 8 }}>
                            <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de Instituição</InputLabel>
                                <Select value={typeInstitutionName} onChange={handleSelectInstitutionType} input={<Input />}>    
                                { typesInstitutions ? typesInstitutions.map((type) => (
                                    <MenuItem key={type.id} value={type.name}>
                                    {type.name}
                                    </MenuItem>
                                )) : <> </> }
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2} style={{ padding: 4 }}>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de Instituição</InputLabel>
                                <Select value={typeInstitutionName} onChange={handleSelectInstitutionType} input={<Input />}>    
                                { typesInstitutions ? typesInstitutions.map((type) => (
                                    <MenuItem key={type.id} value={type.name}>
                                    {type.name}
                                    </MenuItem>
                                )) : <> </> }
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth required value={otherType} onChange={(e) => setOtherType(e.target.value === "" ? null : e.target.value)} label="Tipo de Instituição" />
                            </Grid>
                        </Grid>
                    )}

                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
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

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={nameResponsible} onChange={(e) => setNameResponsible(e.target.value)} label="Nome do responsável" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="formatted-text-mask-input">CPF do responsável</InputLabel>
                            <Input name="textmask" value={CPF} onChange={(e) => setCPF(e.target.value)} inputComponent={CPFMask}/>
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
                    
                    <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <FacebookIcon className={classes.socialMediaIcon} />
                        <TextField value={linkFacebook} onChange={(e) => setLinkFacebook(e.target.value)} fullWidth label="Facebook" />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <InstagramIcon className={classes.socialMediaIcon} />
                        <TextField value={linkInstagram} onChange={(e) => setLinkInstagram(e.target.value)} fullWidth label="Instagram" />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TwitterIcon className={classes.socialMediaIcon} />
                        <TextField value={linkTwitter} onChange={(e) => setLinkTwitter(e.target.value)} fullWidth label="Twitter" />
                    </Grid>

                    <Grid item xs={12} style={{ padding: 0, marginTop: 15, position: 'relative', height: '40vh'}}>
                        <MapRegister styles={classes.mapa} center={coordinates} institution={{lat: latitude, lng: longitude}} handleCoordinates={handleCoordinates}/>
                    </Grid>

                    <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                        <Button onClick={() => setScreen(1)} className={classes.btnPassword}>ALTERAR SENHA</Button>
                    </Grid>
                    <Grid item className={classes.buttonRight} xs={12} sm={6}>
                        <Button onClick={handleUpdateProfile} className={classes.btnOk}>CONFIRMAR</Button>
                    </Grid>
                </Grid>

                ) : (
                    <Grid container spacing={1}>
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
                            <Button onClick={() => setScreen(0)} className={classes.btnPassword}>EDITAR PERFIL</Button>
                        </Grid>
                        <Grid item className={classes.buttonRight} xs={12} sm={6}>
                            <Button onClick={handleChangePassword} className={classes.btnOk}>CONFIRMAR</Button>
                        </Grid>
                    </Grid>
                )}
            </Container>
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
                        image={newAvatar}
                        crop={crop}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        aspect={6 / 4}
                    />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 10 }}>
                        <Button onClick={handleCloseModal} style={{ backgroundColor: 'red' }}>Cancelar</Button>
                        <Button onClick={setCroppedImage} variant="green">Confirmar</Button>
                    </div>
                </div>
                </Fade>
            </Modal>

        </Grid>
    );

}