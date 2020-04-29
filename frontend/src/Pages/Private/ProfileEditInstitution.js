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
import Button from '../../Component/Button';

const useStyles = makeStyles((theme) => ({
    containerRoot: {
        minHeight: '85vh',
        '& div': {
            height: 'fit-content'
        }
    },
    container: {
        height: 'fit-content',
    },
    titulo: {
        display: 'block',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '2rem',
        color: '#247BA0',
        padding: '2vh 0vh'
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
    const [screen, setScreen] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const [nameResponsible, setNameResponsible] = React.useState('');
    const [CPF, setCPF] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    
    return(
        <Grid container className={classes.containerRoot}>
            <Container className={classes.container} maxWidth="lg">
                <label className={classes.titulo}>Editar Perfil</label>
                
                {screen===0 ? (

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <img src={PhotoExample} style={{ maxWidth: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={8} style={{ border: '1px solid' }}>
                        Google Maps Frame
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth value={description} onChange={(e) => setDescription(e.target.value)} label="Breve descrição das atividades" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} label="Nome da Instituição" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={nameResponsible} onChange={(e) => setNameResponsible(e.target.value)} label="Nome do responsável" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                        <Button onClick={() => setScreen(1)} style={{ fontSize: '1.1rem', borderRadius: 10, backgroundColor: '#247BA0' }}>EDITAR PERFIL</Button>
                    </Grid>
                    <Grid item className={classes.buttonRight} xs={12} sm={6}>
                        <Button style={{ display: 'block', fontSize: '1.2rem', borderRadius: 10, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
                    </Grid>
                </Grid>

                ) : (
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField fullWidth value={password} onChange={(e) => setPassword(e.target.value)} label="Senha atual" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label="Nova senha" />
                        </Grid>

                        <Grid item className={classes.buttonLeft} xs={12} sm={6}>
                            <Button onClick={() => setScreen(0)} style={{ fontSize: '1.1rem', borderRadius: 10, backgroundColor: '#247BA0' }}>ALTERAR SENHA</Button>
                        </Grid>
                        <Grid item className={classes.buttonRight} xs={12} sm={6}>
                            <Button style={{ display: 'block', fontSize: '1.2rem', borderRadius: 10, backgroundColor: '#008B00' }}>CONFIRMAR</Button>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Grid>
    );

}
