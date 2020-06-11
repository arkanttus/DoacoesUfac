import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';

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
        backgroundColor: '#44A647',
    }
    
}));

export default function Button(props) {
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
        <button disabled={props.disabled} className={classes.buttonBase + ' ' + theme + ' ' + props.className} onClick={props.onClick} style={props.style}>
            {props.loading || props.loading === true ? (
                <ReactLoading type={props.type} color="#247BA0"/>
            ) : (
            props.children)}
        </button>
    );

}
