import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../../Component/MaterialKit/NavBarHeader/Header';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import InitialFooter from '../../Component/InitialFooter';
import Typography from '@material-ui/core/Typography';

//PAGES
import Home from './Home';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: '8vh'
    }
}));

const MenuLeft = (props) => {
    const classes = useStyles()
    return (
        <>
            <img src="images/Logo.svg" alt="logo" className="logo" />
            <Typography variant="h6" className={classes.title}>
                    Doações
            </Typography>
        </>
    )
}

const Menu = (props) => {
    return (
        <>
            <Button>teste</Button>
            <Button>teste2</Button>
            <Button>teste3</Button>
        </>
    )
}


export default function Dashboard() {
    const classes = useStyles();

    return(
        <div>
            <NavBar
            color="info"
            fixed={true}
            leftLinks={
                <MenuLeft />
            }
            rightLinks={
                <Menu />
            } />
            <main className={classes.main}>
                <Switch>
                    <Route path="/dashboard" component={Home} />
                </Switch>
                <InitialFooter/>
            </main>
        </div>
        
    );

}
