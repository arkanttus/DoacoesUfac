import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Footer from '../../Component/Footer';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Dropdown from '@material-ui/core/Menu';

//PAGES
import Home from './Home';
import NavBarDashboard from '../../Component/NavBarDashboard';
import DonationList from './DonationList';

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <>
            <Button className={classes.NavBarButtons}><AccountBalanceOutlinedIcon />Instituições</Button>
            <Button className={classes.NavBarButtons}><FavoriteBorderIcon />Minhas Doações</Button>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <PersonIcon />
              </IconButton>
              <Dropdown
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
                <MenuItem onClick={handleClose} style={{ color: 'red' }}>Sair</MenuItem>
              </Dropdown>
        </>
    )
}


export default function Dashboard() {
    const classes = useStyles();
    

    return(
        <div>
            <NavBarDashboard />
            <main className={classes.main}>
                <Switch>
                    <Route path="/dashboard/donationlist" component={DonationList} />
                    <Route path="/dashboard" component={Home} />
                </Switch>
                <Footer/>
            </main>
        </div>
        
    );

}
