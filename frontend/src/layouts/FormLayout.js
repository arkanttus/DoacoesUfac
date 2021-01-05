import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InitialNavbar from '../components/InitialNavbar';
import InitialFooter from '../components/InitialFooter';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: 50,
        [theme.breakpoints.up('md')]:{
            paddingTop: 40
        } 
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    main: {
        color: '#FFF',
        backgroundImage: `url(${"/images/BG2.png"})`,
        background: 'no-repeat center center',
        backgroundSize: 'cover'
    }
}));

export default function FormLayout(props) {
    const classes = useStyles();
    return(
        <div>
            <main className={classes.main}>
                    {props.children} 
                <InitialFooter/>
            </main>
        </div>
    );
}
