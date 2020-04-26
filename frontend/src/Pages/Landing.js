import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonCustom from '../Component/Button';
import InitialNavbar from '../Component/InitialNavbar';
import InitialFooter from '../Component/InitialFooter';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Instituicoes from './Instituicoes'
import ComoDoar from './ComoDoar'
import Home from './Home'

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
                        <Route exact path="/instituicoes" component={Instituicoes} />
                        <Route exact path="/comodoar" component={ComoDoar} />
                        <Route  path="/" component={Home} />
                    </Switch>
                    <InitialFooter/>
            </main>
            
        </div>
    );
}
