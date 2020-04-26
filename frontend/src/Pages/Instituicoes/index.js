import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InitialNavbar from '../../Component/InitialNavbar';
import InitialFooter from '../../Component/InitialFooter';
import InstitutionCard from '../../Component/InstitutionCard';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    container: {
        color: '#FFF',
        backgroundImage: `url(${"/images/BG1.svg"})`,
        background: 'no-repeat center center',
        minHeight: '100vh',
        backgroundSize: 'cover'
    },
    buttonFix: {
        '& button': {
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        }   
    },

    textos2: {
        fontSize: 30,
        padding: 15,
        paddingTop: 35,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: '#e5e5e5'
        }
    },
    cardContainer: {
        marginLeft: '10%',
        marginRight: '10%',
        [theme.breakpoints.down('sm')]: {
            margin: 10
        }
    }
}));

export default function Landing() {
    const classes = useStyles();
    const institutions = [{
        name: "Educandário BCA",
        img: "images/HEADER.png"
    },
    {
        name: "Educandário BCA",
        img: "images/HEADER.png"
    },
    {
        name: "Educandário BCA",
        img: "images/HEADER.png"
    },
    {
        name: "Educandário BCA",
        img: "images/HEADER.png"
    },
    {
        name: "Educandário BCA",
        img: "images/HEADER.png"
    },
    {
        name: "Educandário BCA",
        img: "images/HEADER.png"
    }]

    return(
        <Grid container className={classes.container}>
            <Grid container>
                <InitialNavbar/>
            </Grid>

            <Grid container justify="center">
                <Grid item container  xs={12} alignItems="center">
                    <Typography variant="h4" align="center">
                        <Box fontWeight="fontWeightMedium" m={1}>
                            INSTITUIÇÕES
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
            
            <Grid container spacing={4} className={classes.cardContainer}>
                { institutions.map( institution => (
                    <Grid item xs={12} sm={6} md={3}>
                        <InstitutionCard title={institution.name} photo={institution.img}/>
                    </Grid>
                ) )}
            </Grid>

            <Grid container>
                <InitialFooter/>
            </Grid>
        </Grid>
    );
}
