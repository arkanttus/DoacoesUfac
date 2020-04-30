import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';

//PAGES
import DashboardNavbar from '../components/DashboardNavbar';

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
    }
}));

export default function DashboardLayout(props) {
    const classes = useStyles();
    
    return(
        <div>
            <DashboardNavbar />
            <main className={classes.main}>
                {props.children}
                <Footer/>
            </main>
        </div>
        
    );
}
