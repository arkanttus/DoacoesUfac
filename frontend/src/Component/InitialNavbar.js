import React from 'react'
import NavBar from './MaterialKit/NavBarHeader/Header';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: '#e5e5e5'
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
    }
}));

const MenuRight = (props) => {
    const classes = useStyles()
    return (
        <>
            

            <Link to={`/`} className={classes.noLinkStyle}>
                <Button className={classes.button}>INÍCIO</Button>
            </Link>
            <Link to={`/comodoar`} className={classes.noLinkStyle}>
                <Button className={classes.button}>COMO DOAR?</Button>
            </Link>
            <Link to={`/instituicoes`} className={classes.noLinkStyle}>
                <Button className={classes.button}>INSTITUIÇÕES</Button>
            </Link>
        </>
    )
}

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
            />
    )
}