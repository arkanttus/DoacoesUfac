import React from 'react'
import NavBar from './MaterialKit/NavBarHeader/Header';
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
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

import Logo from '../assets/Logo.svg';

const useStyles = makeStyles((theme) => ({
    noLinkStyle: {
        fontSize: "1.2rem",
        textDecoration: 'none',
        color: 'white',
        padding: '0px 10px',
        fontWeight: '300',
        '&:hover': {
            color: '#03A9F4'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            padding: '15px 0px'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    separator: {
        flexGrow: 1
    },
    button: {
        color: "#FFF"
    },
    logo: {
        display: 'flex',
        alignItems: 'center'
    },
    menuRightCollapse: {
        [theme.breakpoints.down('sm')]: {
            marginTop: 20
        }
    },
    appBar: {
        display: "flex",
        border: "0",
        marginBottom: "20px",
        color: "#555",
        width: "100%",
        backgroundColor: "#fff",
        transition: "all 150ms ease 0s",
        alignItems: "center",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        position: "relative",
        zIndex: "unset",
        height: '10vh',
        [theme.breakpoints.down('sm')]: {
          padding: 0,
          height: '8vh',
        }
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
        ...container,
        padding: 0,
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
        color: "#FFFFFF"
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
        backgroundColor: '#444',
        ...transition
      },
      img: {
        [theme.breakpoints.down('sm')]: {
          width: '40px',
          height: '40px'
        }
      }
}));

async function scrollToDiv(id, history) {
  if(history.location.pathname !== "/") {
    await history.push("/")
  }
  var element = document.getElementById(id);
  window.scrollTo(0, element.offsetTop - 95);
}

const MenuRight = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.menuRightCollapse}>
            <Link onClick={() => scrollToDiv("inicio", props.history)} className={classes.noLinkStyle}>
                Início
            </Link>
            <Link onClick={() => scrollToDiv("como-doar", props.history)} className={classes.noLinkStyle}>
                Como Doar?
            </Link>
            <Link onClick={() => scrollToDiv("instituicoes", props.history)} className={classes.noLinkStyle}>
                Instituições
            </Link>
            <Link onClick={() => scrollToDiv("sobre", props.history)} className={classes.noLinkStyle}>
                Sobre
            </Link>
            <Link to={`/contato`} className={classes.noLinkStyle}>
                Contato
            </Link>
            <Link to={`/login`} className={classes.noLinkStyle}>
                Entrar
            </Link>
        </div>
    )
}

const MenuLeft = (props) => {
    const classes = useStyles()
    return (
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          <div className={classes.logo}>
              <img src={Logo} alt="logo" className={classes.img} />
              <Typography variant="h6" className={classes.title}>
                DoAção
              </Typography>
          </div>
        </Link>
    )
}

export default function InitialNavBar() {
    const classes = useStyles()
    const history = useHistory();
    return (
            <NavBar
                styles={classes}
                fixed={true}
                color="primary"
                brand={
                    <MenuLeft />
                }
                rightLinks={
                    <MenuRight history={history} />
                }
            />
    )
}