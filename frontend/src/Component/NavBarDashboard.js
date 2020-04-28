import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './MaterialKit/NavBarHeader/Header';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Dropdown from '@material-ui/core/Menu';

import Logo from '../assets/Logo.svg';

import {
    container,
    defaultFont,
    primaryColor,
    infoColor,
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
        height: '8vh'
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
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        padding: "8px 16px",
        letterSpacing: "unset",
        "&:hover,&:focus": {
            color: "inherit",
            background: "transparent"
        }
    },
    appResponsive: {
        margin: "20px 10px"
    },
    primary: {
        backgroundColor: primaryColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)"
    },
    info: {
        backgroundColor: infoColor,
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
}));

const MenuLeft = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.leftSide}>
            <img src={Logo} alt="logo" className="logo" />
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


export default function NavBardDashboard() {
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
