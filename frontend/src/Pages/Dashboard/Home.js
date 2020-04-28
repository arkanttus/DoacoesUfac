import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-material-ui-carousel';
import WarningIcon from '@material-ui/icons/Warning';
import InstitutionCard from '../../Component/InstitutionCard';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    containerRoot: {
        minHeight: '85vh',
        '& div': {
            height: 'fit-content'
        }
    },
    container: {
        height: 'fit-content'
    },
    containerCarousel: {
        padding: '0 20%',
        [theme.breakpoints.down('xs')]: {
            padding: 0
        }
    },
    carouselImage: {
        maxWidth: '80%'
    },

    cardContainer: {
        marginLeft: '10%',
        marginRight: '10%',
        [theme.breakpoints.down('sm')]: {
            margin: 10
        }
    },

}));

export default function Home() {
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
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>

                <Grid item xs={12} style={{ color: 'red', textAlign: 'center', padding: '4% 0 2% 0', fontSize: '2rem' }}>
                    Instituições sem doações <WarningIcon />
                </Grid>
        
                {/*CARROUSEL*/}
                <Grid container>
                    <Grid item xs={12}>
                        <Carousel interval={5000}>
                            <Grid container className={classes.containerCarousel}>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src="images/Example1.svg" className={classes.carouselImage} />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.containerCarousel}>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src="images/Example1.svg" className={classes.carouselImage} />
                                </Grid>
                            </Grid>
                        </Carousel>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} style={{ textAlign: 'center', padding: '10vh 0vh 5vh 0vh', fontSize: '2rem' }}>
                        Todas as Instituições
                    </Grid>
                </Grid>
                
                <Grid container spacing={4} className={classes.cardContainer}>
                { institutions.map( institution => (
                    <Grid item xs={12} sm={6} md={3} className={classes.cardItem}>
                        <InstitutionCard title={institution.name} photo={institution.img}/>
                    </Grid>
                ) )}
                </Grid>
                
                <Pagination count={10} color="primary" style={{ display: 'block', margin: '3vh auto 3vh auto' }} />

            </Grid>
        </Grid>
    );
}
