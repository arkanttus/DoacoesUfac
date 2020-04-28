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
        [theme.breakpoints.down('sm')]: {
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
    titulo1: {
        textAlign: 'center',
        color: 'red',
        fontSize: '2rem',
        padding: '5vh 0vh 3vh 0vh'
    },
    todasTitle: {
        textAlign: 'center', 
        padding: '10vh 0vh 5vh 0vh', 
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            padding: '5vh 0vh'
        }
    }

}));

export default function Home() {
    const classes = useStyles();
    let institutions = []

    for(let i = 0; i < 8; i++) {
        institutions.push({
            name: "Educandário BCA",
            img: "/images/HEADER.png"
        })
    }

    const withoutDonations = [{
        name: "Orfanato Fulano de Tal",
        img: "/images/Example1.svg"
    },
    {
        name: "Orfanato Fulano de Tal",
        img: "/images/Example1.svg"
    }]

    return (
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>

                <Grid item xs={12} className={classes.titulo1}>
                    Instituições sem doações <WarningIcon />
                </Grid>
        
                {/* CARROUSEL*/}
                <Grid container>
                    <Grid item xs={12}>
                        <Carousel interval={5000}>
                            { withoutDonations.map( institution => (
                                <Grid container className={classes.containerCarousel}>
                                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={institution.img} className={classes.carouselImage} alt="logo"/>
                                    </Grid>
                                </Grid>
                            ) )}
                        </Carousel>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} className={classes.todasTitle}>
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
