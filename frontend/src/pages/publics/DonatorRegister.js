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
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

//Icons Material UI
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import PhotoIcon from '@material-ui/icons/Photo';

//Components
import Card from "../../components/MaterialKit/Card/Card";
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";
import { Cities } from "../../components/Cities";
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../components/cropImage';
import ButtonNavigo from '../../components/Button';

//Services
import api, { sendRequest } from "../../services/api";
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
    cardBody: {
        [theme.breakpoints.down('xs')]: {
            padding: "0.9375rem 1rem",
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '80vh',
        height: '80vh'
    },
    containerModal: {
        position: 'relative',
        height: '70vh',
        [theme.breakpoints.down('xs')]: {
            height: '70vh'
        }
    },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      gridCard: {
          display: 'flex',
          justifyContent: 'center',
          height: 'fit-content'
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
    const [avatar, setAvatar] = React.useState(null);
    const [avatarBlob, setAvatarBlob] = React.useState(null);
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
    //Pegar imagem do input
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
    //Modal
    const [open, setOpen] = React.useState(false);
    const handleOpenModal = () => {
        setOpen(true);
    };
    const handleCloseModal = () => {
        setOpen(false);
    };
    //Crop
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
    const [croppedAvatar, setCroppedAvatar] = React.useState(null);
    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const setCroppedImage = React.useCallback(async() => {
        try {
            const croppedImage = await getCroppedImg(
                avatar,
                croppedAreaPixels,
                0
            );
            setAvatarBlob(croppedImage);
            var imageFile = URL.createObjectURL(croppedImage);
            setCroppedAvatar(imageFile);
            handleCloseModal();
        } catch(e) {
            console.log(e);
        }
    });

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

        setWaiting(true);
        setWaiting(false);
        Swal.fire({
            title: "Seu cadastro foi realizado com sucesso!",
            text: "Você será redirecionado para a página de Login!",
            icon: 'success',
            confirmButtonText: 'Obrigado'
        }).then(() => {
            props.history.push('/login');
        });
    }

    return(
        <Grid container className={classes.container}>
            <Container component="main" maxWidth="sm" style={{ display: 'flex', alignItems: 'center' }}>
                <CssBaseline />
                <Grid item xs={12} className={classes.gridCard}>
                    <Card style={{width: "35rem"}}>
                        <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', marginLeft: 0, marginRight: 0, color: '#FFF' }}>Cadastro de Doador</CardHeader>
                        <CardBody className={classes.cardBody}>
                            <Grid container>
                            <Grid container>
                                <input onChange={(e) => getImage(e)} accept="image/*" id="uploadAvatar" type="file" style={{ display: "none" }} />
                                    <Grid item xs={12} className={classes.imgGrid}>
                                        {croppedAvatar === null ? (
                                            <label htmlFor="uploadAvatar"> <PhotoIcon /> Clique aqui para adicionar uma foto</label>
                                        ) : (
                                            <label htmlFor="uploadAvatar" style={{ padding: 0 }}>
                                                <img src={croppedAvatar} alt="avatar" style={{ maxWidth: '45%', display: 'block', margin: 'auto' }} />
                                            </label>
                                        )}
                                    </Grid>
                                </Grid>
                                
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
    );
}