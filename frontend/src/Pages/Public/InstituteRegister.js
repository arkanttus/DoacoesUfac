import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import CpfIcon from '@material-ui/icons/AssignmentInd';
import InstituicaoIcon from '@material-ui/icons/AccountBalance';
import CallIcon from '@material-ui/icons/Call';
import TipoIcon from '@material-ui/icons/HomeWork';
import DescricaoIcon from '@material-ui/icons/BorderColorOutlined';
import LocationIcon from '@material-ui/icons/LocationOn';


import Card from "../../Component/MaterialKit/Card/Card";
import CardBody from "../../Component/MaterialKit/Card/CardBody";
import CardHeader from "../../Component/MaterialKit/Card/CardHeader";



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
          padding: 0
      }

}));
  
export default function CadastroInstituicao() {
    const classes = useStyles();
    const [ screen,setScreen] = React.useState(0);
    const [ nome,setNome] = React.useState("");
    const [ cpf,setCpf] = React.useState("");
    const [ email,setEmail] = React.useState("");
    const [ senha,setSenha] = React.useState("");
    const [ instituicao,setInstituicao] = React.useState("");
    const [ telefone,setTelefone] = React.useState("");
    const [ tipo,setTipo] = React.useState("");
    const [ descricao,setDescricao] = React.useState("");
   
    return(
        <Grid container className={classes.container}>
        <Container component="main" maxWidth="sm" style={{ display: 'flex', alignItems: 'center' }}>
            <CssBaseline />
            { screen === 0 ? (
                   <Grid item xs={12}  justify="center" className={classes.gridCard}>
                   <Card style={{width: "35rem"}}>
                       <CardHeader style={{ textAlign: 'center', fontSize: 25, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Instituição</CardHeader>
                       <CardBody>
                           <Grid container>                   
                               <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                   <Grid item>
                                       <FaceIcon style={{  color: "#555", marginLeft: -8, marginRight: 20 }} />
                                   </Grid>
                                   <Grid item xs={10} sm={11}>
                                       <TextField   onChange={e => setNome(e.target.value)}
                                          variant="standard" required fullWidth  name="nome" value={nome} label="Nome completo do responsável" autoComplete="nome"/>
                                   </Grid>
                               </Grid>

                               <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                   <Grid item>
                                       <CpfIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                   </Grid>
                                   <Grid item xs={10} sm={11}>
                                       <TextField  onChange={e => setCpf(e.target.value)} value={cpf} variant="standard" required fullWidth name="cpf" label="CPF do responsável"  id="cpf" autoComplete="cpf"/>
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
                                       <TextField  onChange={e => setSenha(e.target.value)} value={senha} variant="standard" required fullWidth name="password" label="Senha de acesso" type="password" id="password" autoComplete="current-password"/>
                                   </Grid>
                               </Grid>

                           </Grid>
                           <Button onClick={() => setScreen(screen ? 0 : 1)} type="button" style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15 }} color="primary">CONTINUAR</Button>
                       </CardBody>
                   </Card>
               </Grid>            
            ): (
                <Container component="main" maxWidth="sm" style={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12}  justify="center" className={classes.gridCard}>
                        <Card style={{width: "30rem"}}>
                            <CardHeader style={{ textAlign: 'center', fontSize: 20, background: 'linear-gradient(90deg, #247BA0 0%, #10668B 100%)', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)', color: '#FFF' }}>Cadastro de Instituição</CardHeader>
                            <CardBody>
                                <Grid container>
                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <InstituicaoIcon style={{  color: "#555", marginLeft: -15, marginRight: 10 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <TextField  onChange={e => setInstituicao(e.target.value)} value={instituicao} variant="standard" required fullWidth id="nome" label="Nome da Instituição" name="instituicao" autoComplete="nome"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <CallIcon style={{ color: "#555", marginLeft: -15, marginRight: 10 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <TextField  onChange={e => setTelefone(e.target.value)} value={telefone} variant="standard" required fullWidth name="telefone" label="Telefone"  id="telefone" autoComplete="telefone"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <TipoIcon style={{ color: "#555", marginLeft: -15, marginRight: 10 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <TextField  onChange={e => setTipo(e.target.value)} value={tipo} variant="standard" required fullWidth name="tipo" label="Tipo de Instituição"  id="tipo" autoComplete="tipo"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <DescricaoIcon style={{ color: "#555", marginLeft: -15, marginRight: 10 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <TextField   onChange={e => setDescricao(e.target.value)} value={descricao} variant="standard" required fullWidth name="descricao" label="Breve descrição sobre a Instituição"  id="descricao" autoComplete="descricao"/>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ padding: 10 }} alignItems="flex-end">
                                        <Grid item>
                                            <LocationIcon style={{ color: "#555", marginLeft: -15, marginRight: 10 }} />
                                        </Grid>
                                        <Grid item xs={10} sm={11}>
                                            <label>FINGE QUE TEM UMA MAPA AQUI :) </label>
                                        </Grid>
                                    </Grid>
                                </Grid>   
                                
                                <Grid container spacing={3}>
                                    <Button onClick={() => setScreen(screen ? 0 : 1)} type="button" style={{ display: 'block', margin: 'auto', marginTop: 5, marginBottom: 5 }} color="primary">VOLTAR</Button>
                                    <Button type="button" style={{ display: 'block', margin: 'auto', marginTop: 15, marginBottom: 15 }} color="primary">FINALIZAR</Button>
                                </Grid> 

                            </CardBody>
                        </Card>
                    </Grid>   
             </Container>
                       
            ) }      
        </Container>
    </Grid>
    ) 
        
    
    
}

