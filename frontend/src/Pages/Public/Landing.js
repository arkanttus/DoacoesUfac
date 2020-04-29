import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InitialNavbar from '../../Component/InitialNavbar';
import InitialFooter from '../../Component/InitialFooter';
import Institutions from './Institutions'
import HowToDonate from './HowToDonate'
import Home from './Home'
import Login from './Login'
import DonatorRegister from './DonatorRegister'
import InstituteRegister from './InstituteRegister'
import AboutTeam from './AboutTeam'
import Credits from './Credits'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: 50,
        [theme.breakpoints.up('md')]:{
            paddingTop: 40
        } 
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    main: {
        color: '#FFF',
        backgroundImage: `url(${"/images/BG1.svg"})`,
        background: 'no-repeat center center',
        backgroundSize: 'cover'
    }
}));

export default function Landing() {
    const classes = useStyles();

    return(
        <div>
            <InitialNavbar/>
            <main className={classes.main}>
                <Switch>
                    <Route exact path="/instituicoes" component={Institutions} />
                    <Route exact path="/como-doar" component={HowToDonate} />
                    <Route exact path="/equipe" component={AboutTeam} />
                    <Route exact path="/creditos" component={Credits} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/instituicao" component={InstituteRegister} />
                    <Route exact path="/doador" component={DonatorRegister} />
                    <Route  path="/" component={Home} />
                </Switch>
            
                <InitialFooter/>
            </main>
            
        </div>
    );
}
