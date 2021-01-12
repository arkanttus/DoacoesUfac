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
import FavoriteIcon from '@material-ui/icons/Favorite';

//Services
import { setUser, getUser } from '../../services/auth';
import api, { sendRequest, getUserById } from "../../services/api";

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
        },
        display: 'flex',
        alignItems: 'center'
    },
    container: {
        height: 'fit-content'
    },
    titulo1: {
        color: '#247BA0',
        display: 'block',
        fontWeight: 'bold',
        fontSize: '2rem',
        margin: '0 auto 0% auto',
        textAlign: 'center'
    },
    divAvatar: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        '& label': {
            display: 'flex',
            justifyContent: 'center',
            '& img': {
                maxWidth: '50%'
            }
        },
        
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
    formField: {
        borderRadius: 5,
        padding: '5px!important',
        marginBottom: 5,
        "& div label": {
            color: "black!important"
        },
        "& div div": {
            color: "black!important"
        }
    }

}));

export default function DonatorView({ props }) {
    const classes = useStyles();
    const Swal = require('sweetalert2');


    const itemsEstados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
                "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
                "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
    

    const [userAvatar, setUserAvatar] = React.useState(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [uf, setUF] = React.useState("Acre");
    const [city, setCity] = React.useState("");
    const [donations, setDonations] = React.useState(0);

    async function loadData() {
        let response = await getUserById(props.match.params.id);
        if(response) {
            setName(response.name)
            setEmail(response.email)
            setPhone(response.phoneNumber)
            setName(response.name)
            setUF(itemsEstados.filter(obj => {return obj === response.uf})[0])
            setCity(response.city)
            setUserAvatar(response.image)
            setDonations(response.totalDonations)
        }
    }

    React.useEffect(() => {
        loadData()
    }, []);

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                
                <Container maxWidth="sm">
                    <Grid container spacing={4} className={classes.containerForm}>
                        <label className={classes.titulo1}>{ name }</label>
                            <Grid item xs={12} className={classes.divAvatar}>
                                <label >
                                    {userAvatar !== null ? (
                                        <img src={userAvatar} alt="profile" />
                                    ) : (
                                        <img src={null} alt="profile" />
                                    )}
                                </label>
                            </Grid>
                        
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FavoriteIcon style={{color:"#E53935" }} /> <strong style={{ paddingTop: 3, color: 'black' }}>{donations}</strong>
                        </Grid>

                        <Grid item xs={12} className={classes.formField}>
                            <TextField disabled fullWidth required value={email} label="Email" />
                        </Grid>
                        <Grid item xs={12} className={classes.formField}>
                        <FormControl disabled fullWidth required>
                            <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                            <Input name="textmask" id="formatted-text-mask-input" inputComponent={PhoneMask} value={phone} />
                        </FormControl>
                        </Grid>

                        <Grid item xs={12} className={classes.formField}>
                            <TextField disabled fullWidth required value={uf} label="Estado" />
                        </Grid>

                        <Grid item xs={12} className={classes.formField}>
                            <TextField disabled fullWidth required value={city} label="Cidade" />
                        </Grid>

                    </Grid>

                </Container>

            </Grid>
        </Grid>
    );
}