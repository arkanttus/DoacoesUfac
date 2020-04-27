import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../../Component/MaterialKit/NavBarHeader/Header';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import InitialFooter from '../../Component/InitialFooter';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

//PAGES
import Home from './Home';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: '8vh'
    },
    leftSide: {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: '7.5vh',
            marginRight: 5
        },
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#247BA0',
            color: '#FFF',
            margin: '-20px -10px 20px -10px',
            padding: 3,
            display: 'flex',
            justifyContent: 'center'
        }
    },
    NavBarButtons: {
        color: '#FFF',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            color: '#000',
            margin: '5px 0',
            '& span svg': {
                paddingRight: 5
            }
        }
    }
}));

const MenuLeft = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.leftSide}>
            <img src="images/Logo.svg" alt="logo" className="logo" />
            <Typography variant="h6" className={classes.title}>
                    Doações
            </Typography>
        </div>
    )
}

const Menu = (props) => {
    const classes = useStyles();
    return (
        <>
            <Button className={classes.NavBarButtons}><AccountBalanceOutlinedIcon />Instituições</Button>
            <Button className={classes.NavBarButtons}><FavoriteBorderIcon />Minhas Doações</Button>
            <Button className={classes.NavBarButtons}><PersonIcon /></Button>
            
        </>
    )
}


export default function Dashboard() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
