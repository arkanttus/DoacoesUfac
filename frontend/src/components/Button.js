import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    buttonBase: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: 30,
        color: '#FFF',
        padding: '10px 20px',
        cursor: 'pointer',
        '&:hover': { filter: 'brightness(1.1)' },
        '&:active': { filter: 'brightness(1.2)' },
        '&:focus': { outline: 'none' }
    },
    
    buttonBlue: {
        backgroundColor: '#2D9CDB',
        
    },
    buttonYellow: {
        backgroundColor: '#BF9A1E',
    },
    buttonBlueDark: {
        backgroundColor: '#247BA0',
    },
    buttonGreen: {
        backgroundColor: '#428149',
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
        <button className={classes.buttonBase + ' ' + theme} onClick={props.onClick} style={props.style}>{props.children}</button>
    );

}
