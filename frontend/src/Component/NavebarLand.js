import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    navbar: {
        '& ul': {
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            fontSize: '12px',
            '& li' :{
                padding: '10px 25px'
            },
            '& li:nth-of-type(2)': {
                marginRight: 'auto',
                fontSize: '18px'
            },
            '& li:nth-of-type(4)': {
                marginLeft: 'auto'
            }
        }
    },

    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: '#e5e5e5'
        }
    },
  
  }));

export default function NavbarLand() {
    const classes = useStyles();
    return(
        <nav className={classes.navbar}>
        <ul>
            <li>
                <img src="images/Logo.svg" alt="logo" className="logo" />
            </li>
            <li style={{ paddingLeft: 0 }}>Doações</li>
            <Link to="/ComoDoar" className={classes.noLinkStyle}>
                <li>COMO DOAR?</li>
            </Link>
            
            <li>INSTITUIÇÕES</li>
        </ul>
        </nav>
    );
}