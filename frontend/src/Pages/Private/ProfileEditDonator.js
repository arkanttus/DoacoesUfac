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
        margin: '10vh auto 0vh 10vh',
        fontWeight: 'bold',
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            margin: '8vh auto 2vh auto'
        }
    },
    containerForm: {
        margin: '0vh 10vh',
        [theme.breakpoints.down('sm')]: {
            margin: 0
        }
    },
    formRoot: {
        margin: theme.spacing(4),
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(2),
        }
    },
    containerInputs: {
        
    }

}));

export default function ProfileEditDonator() {
    const classes = useStyles();
    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>

                <label className={classes.titulo1}>Editar Perfil</label>

                <Grid container className={classes.containerForm}>
                    <form className={classes.formRoot} noValidate autoComplete="off">
                    <Grid container spacing={4} className={classes.containerInputs}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Nome Completo" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="CPF" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Email" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                            <Input
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={TextMaskCustom}
                            />
                        </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" fullWidth label="Alterar Senha" />
                        </Grid>

                        <Button variant="green" style={{ display: 'block', margin: 'auto', width: '25vh', height: '6vh', fontSize: '1.2rem', marginTop: '10vh' }}>CONFIRMAR</Button>

                    </Grid>
                    </form>
                </Grid>

            </Grid>
        </Grid>
    );

}
