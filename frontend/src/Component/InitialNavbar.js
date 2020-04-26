import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
      nav: {
        backgroundColor: "transparent",
        boxShadow: "none"
      },
      title: {
        color: "#FFF",
        marginLeft: "5px"
      },
      button: {
        color: "#FFF"
      }
}));

export default function InitialNavbar(props, children) {
    const classes = useStyles();

    return(
        <AppBar className={classes.nav} position='fixed'>
            <Toolbar>
                <img src="images/Logo.svg" alt="logo" className="logo" />
                <Typography variant="h6" className={classes.title}>
                    Doações
                </Typography>
                <div className={classes.separator} />
                <Link to={`/`} className={classes.noLinkStyle}>
                  <Button className={classes.button}>INICIAL</Button>
                </Link>
                <Link to={`/comodoar`} className={classes.noLinkStyle}>
                  <Button className={classes.button}>COMO DOAR?</Button>
                </Link>
                <Link to={`/instituicoes`} className={classes.noLinkStyle}>
                  <Button className={classes.button}>INSTITUIÇÕES</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );

}
