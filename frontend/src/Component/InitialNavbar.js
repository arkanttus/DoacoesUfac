import React from 'react'
import NavBar from './MaterialKit/NavBarHeaderLanding/Header';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: '#e5e5e5'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    separator: {
        flexGrow: 1
    },
    title: {
        color: "#FFF",
        marginLeft: "15px"
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
    }
}));

const MenuRight = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.menuRightCollapse}>
            <Link to={`/`} className={classes.noLinkStyle}>
                <Button className={classes.button}>INÍCIO</Button>
            </Link>
            <Link to={`/comodoar`} className={classes.noLinkStyle}>
                <Button className={classes.button}>COMO DOAR?</Button>
            </Link>
            <Link to={`/instituicoes`} className={classes.noLinkStyle}>
                <Button className={classes.button}>INSTITUIÇÕES</Button>
            </Link>
        </div>
    )
}

const MenuLeft = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.logo}>
            <img src="images/Logo.svg" alt="logo" className="logo" />
            <Typography variant="h6" className={classes.title}>
                    Doações
            </Typography>
        </div>
    )
}

export default function Home() {
    return (
            <NavBar
                color="transparent"
                fixed={true}
                leftLinks={
                    <MenuLeft />
                }
                rightLinks={
                    <MenuRight />
                } 
                changeColorOnScroll={
                    {
                        height: 10,
                        color: 'dark'
                    }
                }
            />
    )
}