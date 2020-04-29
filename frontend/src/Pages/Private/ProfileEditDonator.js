import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '../../Component/Button';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function TextMaskCustom(props) {
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
        margin: '8vh auto 2vh auto'

    },
    containerForm: {
        margin: '0vh 60vh',
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
        [theme.breakpoints.up('md')]:{
            margin: '0vh 10vh',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0vh 40vh',
        },
        [theme.breakpoints.up('xl')]: {
            margin: '0vh 65vh',
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

export default function ProfileEditDonator() {
    const classes = useStyles();
    const [screen, setScreen] = React.useState(0);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');

    return(
        <Grid container className={classes.containerRoot}>
                
                {screen===0 ? (
                <Grid container className={classes.container}>
                    <label className={classes.titulo1}>Editar Perfil</label>
                    <Grid container spacing={4} className={classes.containerForm}>
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
                            inputComponent={TextMaskCustom}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                </Grid>
                ) : (
                <Grid container className={classes.container}>
                    <label className={classes.titulo1}>Alterar Senha</label>
                    <Grid container spacing={4} className={classes.containerForm}>
                        <Grid item xs={12}>
                            <TextField fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Senha atual" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label="Nova senha" />
                        </Grid>

                        <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                            <Button onClick={() => setScreen(0)} style={{ fontSize: '1.1rem', borderRadius: 10, backgroundColor: '#247BA0' }}>ALTERAR SENHA</Button>
                        </Grid>
                        <Grid item className={classes.buttonRight} xs={12} sm={6}>
                            <Button style={{ display: 'block', fontSize: '1.2rem', borderRadius: 10, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
                        </Grid>
                        
                    </Grid>
                </Grid>
                )}

        </Grid>
    );

}
