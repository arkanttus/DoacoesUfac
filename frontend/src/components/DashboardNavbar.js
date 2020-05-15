import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import NavBar from './MaterialKit/NavBarHeader/Header';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Dropdown from '@material-ui/core/Menu';
import Logo from '../assets/Logo.svg';

import { logout, getUser } from '../services/auth';

import {
    defaultFont,
    successColor,
    warningColor,
    dangerColor,
    roseColor,
    transition,
    boxShadow,
    drawerWidth
  } from "./MaterialKit/material-kit-react.js";
  

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: '8vh'
    },
    leftSide: {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            /*width: '7.5vh',*/
            marginRight: 5
        },
        [theme.breakpoints.down('sm')]: {
            color: '#FFF',
            /*backgroundColor: '#247BA0',
            margin: '-20px -10px 20px -10px',
            padding: 3,*/
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
    },
    appBar: {
        display: "flex",
        border: "0",
        borderRadius: "3px",
        padding: "0.625rem 0",
        marginBottom: "20px",
        color: "#555",
        width: "100%",
        backgroundColor: "#fff",
        boxShadow:
            "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
        transition: "all 150ms ease 0s",
        alignItems: "center",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        position: "relative",
        zIndex: "unset",
        maxHeight: '60px'
    },
    absolute: {
        position: "absolute",
        zIndex: "1100"
    },
    fixed: {
        position: "fixed",
        zIndex: "1100"
    },
    container: {
        
        minHeight: "50px",
        flex: "1",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "nowrap"
    },
    flex: {
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center'
        }
      },
    title: {
        ...defaultFont,
        lineHeight: "30px",
        fontSize: "32px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        padding: "8px 10px 8px 0px",
        letterSpacing: "unset",
        "&:hover,&:focus": {
            color: "inherit",
            background: "transparent"
        }
    },
    logo: {
        width: '40px',
        height: '40px'
    },
    appResponsive: {
        margin: "20px 10px"
    },
    primary: {
        backgroundColor: "primaryColor",
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)"
    },
    info: {
        backgroundColor: "#247BA0",
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)"
    },
    success: {
        backgroundColor: successColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)"
    },
    warning: {
        backgroundColor: warningColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)"
    },
    danger: {
        backgroundColor: dangerColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)"
    },
    rose: {
        backgroundColor: roseColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
    },
    transparent: {
        backgroundColor: "transparent !important",
        boxShadow: "none",
        paddingTop: "25px",
        color: "#FFFFFF",

    },
    dark: {
        color: "#FFFFFF",
        backgroundColor: "#212121 !important",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
    },
    white: {
        border: "0",
        padding: "0.625rem 0",
        marginBottom: "20px",
        color: "#555",
        backgroundColor: "#fff !important",
        boxShadow:
            "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
        },
    drawerPaper: {
        border: "none",
        bottom: "0",
        transitionProperty: "top, bottom, width",
        transitionDuration: ".2s, .2s, .35s",
        transitionTimingFunction: "linear, linear, ease",
        width: drawerWidth,
        ...boxShadow,
        position: "fixed",
        display: "block",
        top: "0",
        height: "100vh",
        left: "0",
        right: "auto",
        visibility: "visible",
        overflowY: "visible",
        borderTop: "none",
        textAlign: "left",
        paddingRight: "0px",
        paddingLeft: "0",
        backgroundColor: '#FFF',
        ...transition
    },
    navHiddenItem: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex'
        }
    },
    navHiddenInvert: {
        display: 'inline-flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
    },
}));

const MenuLeft = (props) => {
    const classes = useStyles();
    return (
        <Link to={"/dashboard"} style={{ textDecoration: "none", color: "white" }}>
            <div className={classes.leftSide}>
                    <img src={Logo} alt="logo" className={classes.logo} />
                    <Typography variant="h6" className={classes.title}>
                            Doações
                    </Typography>
            </div>
        </Link>
    )
}

const Menu = withRouter((props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const user = getUser();

    return (
        <>
            { user && user.typeUser === 'Doador' ? (
                <>
                    <Link to="/dashboard" className={classes.noLinkStyle}><Button className={classes.NavBarButtons}><AccountBalanceOutlinedIcon className={classes.navHiddenItem}/>Instituições</Button></Link>
                    <Link to="/minhas-doacoes" className={classes.noLinkStyle}><Button className={classes.NavBarButtons}><FavoriteBorderIcon  className={classes.navHiddenItem}/>Minhas Doações</Button></Link>
                </>
            ) : (
                <>
                    <Link to="/solicitacoes" className={classes.noLinkStyle}><Button className={classes.NavBarButtons}><AccountBalanceOutlinedIcon className={classes.navHiddenItem}/>Solicitações</Button></Link>
                    <Link to="/doacoes" className={classes.noLinkStyle}><Button className={classes.NavBarButtons}><FavoriteBorderIcon  className={classes.navHiddenItem}/>Doações</Button></Link>
                </>
            )}
            <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit" className={classes.navHiddenInvert}>
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
                <Link to="/conta" style={{ color: '#000' }} className={classes.noLinkStyle}>
                    <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
                </Link>
                <Link to="/sair" className={classes.noLinkStyle}>
                    <MenuItem style={{ color: 'red' }}>Sair</MenuItem>
                </Link>
              </Dropdown>
            <Link to="/conta" className={classes.noLinkStyle}>
                <Button className={[classes.NavBarButtons, classes.navHiddenItem]}><PersonIcon />Minha Conta</Button>
            </Link>
            <Link to="/sair" className={classes.noLinkStyle}>
                <Button className={[classes.NavBarButtons, classes.navHiddenItem]} style={{ color: 'red' }}><ExitToAppIcon  />Sair</Button>
            </Link>
        </>
    )
})


export default function DashboardNavbar() {
    const classes = useStyles();
    
    return(
        <NavBar
            styles={classes}
            color="info"
            fixed={true}
            brand={
                <MenuLeft />
            }
            rightLinks={
                <Menu />
            } 
        />
    );
}
