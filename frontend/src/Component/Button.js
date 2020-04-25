import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    buttonBlue: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#2D9CDB',
        border: 'none',
        borderRadius: 30,
        color: '#FFF',
        padding: '10px 20px',
        '&:hover': { filter: 'brightness(1.1)' },
        '&:active': { filter: 'brightness(1.2)' },
        '&:focus': { outline: 'none' }
    },
    buttonYellow: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#BF9A1E',
        border: 'none',
        borderRadius: 30,
        color: '#FFF',
        padding: '10px 20px',
        '&:hover': { filter: 'brightness(1.1)' },
        '&:active': { filter: 'brightness(1.2)' },
        '&:focus': { outline: 'none' }
    },
    buttonBlueDark: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#247BA0',
        border: 'none',
        borderRadius: 30,
        color: '#FFF',
        padding: '10px 20px',
        '&:hover': { filter: 'brightness(1.1)' },
        '&:active': { filter: 'brightness(1.2)' },
        '&:focus': { outline: 'none' }
    },
    buttonGreen: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#428149',
        border: 'none',
        borderRadius: 30,
        color: '#FFF',
        padding: '10px 20px',
        '&:hover': { filter: 'brightness(1.1)' },
        '&:active': { filter: 'brightness(1.2)' },
        '&:focus': { outline: 'none' }
    }
    
}));

export default function Button(props, children) {
    const classes = useStyles();
    let theme = null;
    if(props.variant === "blue") {
        theme = classes.buttonBlue;
    } else if(props.variant === "yellow") {
        theme = classes.buttonYellow;
    } else if(props.variant === "blueDark") {
        theme = classes.buttonBlueDark;
    } else if(props.variant === "green") {
        theme = classes.buttonGreen;
    }

    return(
        <button className={theme}>{props.children}</button>
    );

}
