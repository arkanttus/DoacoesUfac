import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Cropper from 'react-easy-crop';

//Services
import { setUser, getUser } from '../../services/auth';
import api, { sendRequest } from "../../services/api";

//Components
import { Cities } from "../../components/Cities";
import getCroppedImg from '../../components/cropImage';
import PhotoExample from '../../assets/PhotoExample.svg';
import WaitLoading from '../../components/WaitLoading';

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
    titulo1: {
        color: '#247BA0',
        display: 'block',
        fontWeight: 'bold',
        fontSize: '2rem',
        margin: '10% auto 5% auto',
        textAlign: 'center'
    },
    divAvatar: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        '& label': {
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
                maxWidth: '50%'
            }
        },
        '&:hover': {
            filter: 'brightness(0.5)',
        }
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

}));

export default function ProfileEditDonator() {
    const classes = useStyles();
    const user = getUser();
    const Swal = require('sweetalert2');

    const cities = Cities();
    const itemsEstados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
                "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
                "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
    
    const [screen, setScreen] = React.useState(0);
    const [newAvatar, setNewAvatar] = React.useState(null);
    const [userAvatar, setUserAvatar] = React.useState(user.image);
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);
    const [phone, setPhone] = React.useState(user.phoneNumber);
    const [uf, setUF] = React.useState(itemsEstados.filter(obj => {return obj === user.uf})[0]);
    const [citiesArray, setCitiesArray] = React.useState(cities[user.uf].cidades);
    const [city, setCity] = React.useState(user.city);
    const [password, setPassword] = React.useState('');
    const [newPassword1, setNewPassword1] = React.useState('');
    const [newPassword2, setNewPassword2] = React.useState('');
    const [waiting, setWaiting] = React.useState(false);

    function handleSelectCities(e) {
        setUF(e.target.value);
        setCity("");
        setCitiesArray(cities[e.target.value].cidades);
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
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
    const [coordinates, setCoordinates] = React.useState(null);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
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
    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const setCroppedImage = React.useCallback(async() => {
        setWaiting(true);
        try {
            const croppedImage = await getCroppedImg(
                newAvatar,
                croppedAreaPixels,
                0
            );
            var formData = new FormData();
            formData.append('image', croppedImage, user.id + ".jpg");

            api.patch(`users/${user.id}/`, formData)
            .then(response => {
                //const data = response.data
                if(response.status === 200) {
                    Swal.fire({
                        title: "Sua foto foi atualizada!",
                        icon: "success",
                        confirmButtonText: "Ok"
                    });
                    setUser(response.data);
                    setUserAvatar(response.data.image);
                    setNewAvatar(null);
                    handleCloseModal();
                } else {
                    handleCloseModal();
                    setNewAvatar(null);
                    Swal.fire({
                        title: "Não foi possível atualizar sua foto!",
                        icon: "error",
                        confirmButtonText: "Ok"
                    });
                }
            })
            .catch( err => {
                if(err.response.status === 400) {
                    handleCloseModal();
                    setNewAvatar(null);
                    Swal.fire({
                        title: "Não foi possível atualizar sua foto!",
                        icon: "error",
                        confirmButtonText: "Ok"
                    });
                }
            })
            setWaiting(false);
        } catch(e) {
            console.log(e);
            setWaiting(false);
        }
    });

    //Atualizar perfil
    async function handleUpdateProfile() {
        //Nome completo vazio
        if(name === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Nome Completo",
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
        if(uf === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Estado",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        if(city === "") {
            Swal.fire({
                title: "Este campo não pode ser vazio!",
                text: "Cidade",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }

        const response = await sendRequest("PATCH", "users/" + user.id + "/", { name, email, phoneNumber: phone, uf, city });
        if(response.status === 200) {
            Swal.fire({
                title: "Seus dados foram atualizados!",
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setUser(response.data);
        } else {
            //Número de telefone inválido
            if(response.data.phoneNumber) {
                Swal.fire({
                    title: "Número de telefone inválido!",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            } else {
                Swal.fire({
                    title: "Algo deu errado. Tente novamente ou entre em contato conosco!",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            }   
        }
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
            setPassword("");
            setNewPassword1("");
            setNewPassword2("");
        } else {
            Swal.fire({
                title: "Aconteceu um problema. Tente novamente mais tarde ou entre em contato conosco!",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
        
    }//Atualizar senha
    
    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                
                <Container maxWidth="sm">
                    {screen===0 ? (
                    <Grid container spacing={4} className={classes.containerForm}>
                        <label className={classes.titulo1}>Edição de Conta</label>
                        <input onChange={(e) => getImage(e)} accept="image/*" id="uploadAvatar" type="file" style={{ display: "none" }} />
                        <Tooltip title="Clique para alterar a foto" arrow>
                            <Grid item xs={12} className={classes.divAvatar}>
                                <label htmlFor="uploadAvatar">
                                    {userAvatar !== null ? (
                                        <img src={userAvatar} alt="profile" />
                                        
                                    ) : (
                                        <img src={PhotoExample} alt="profile" />
                                    )}
                                </label>
                            </Grid>
                        </Tooltip>
                        <Grid item xs={12}>
                            <TextField fullWidth required value={name} onChange={(e) => setName(e.target.value)} label="Nome Completo" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                            <Input name="textmask" id="formatted-text-mask-input" inputComponent={PhoneMask} value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                            <InputLabel>Estado *</InputLabel>
                                <Select value={uf ? uf : ""} onChange={handleSelectCities} input={<Input />}>    
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
                                    <Select value={city ? city : ""} onChange={(e) => setCity(e.target.value)} input={<Input />}>    
                                    {citiesArray ? (citiesArray.map((item) => (
                                        <MenuItem key={item} value={item}>
                                        {item}
                                        </MenuItem>
                                    ))) : (
                                        <div></div>
                                    )}
                                    </Select>
                            </FormControl>
                        </Grid>

                        <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                            <Button onClick={() => setScreen(1)} style={{ fontSize: '1.1rem', borderRadius: 3, backgroundColor: '#247BA0' }}>ALTERAR SENHA</Button>
                        </Grid>
                        <Grid item className={classes.buttonRight} xs={12} sm={6}>
                            <Button onClick={() => handleUpdateProfile()} style={{ display: 'block', fontSize: '1.2rem', borderRadius: 3, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
                        </Grid>

                    </Grid>

                    ) : (
                        <Grid container spacing={4} className={classes.containerForm}>
                            <label className={classes.titulo1}>Alterar Senha</label>
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
                                <Button onClick={() => setScreen(0)} style={{ fontSize: '1.1rem', borderRadius: 3, backgroundColor: '#247BA0' }}>ALTERAR PERFIL</Button>
                            </Grid>
                            <Grid item className={classes.buttonRight} xs={12} sm={6}>
                            <Button onClick={() => handleChangePassword()} style={{ display: 'block', fontSize: '1.2rem', borderRadius: 3, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
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
                            <WaitLoading isLoading={waiting} type="spin" style={{ display: "block", height: "5%", width: "5%" }}>
                                <Button onClick={setCroppedImage} variant="green">Confirmar</Button>
                            </WaitLoading>
                        </div>
                    </div>
                    </Fade>
                </Modal>

            </Grid>
        </Grid>
    );

}