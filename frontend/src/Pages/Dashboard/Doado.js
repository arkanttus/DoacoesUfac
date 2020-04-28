import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-material-ui-carousel';
import WarningIcon from '@material-ui/icons/Warning';
import InstitutionCard from '../../Component/InstitutionCard';
import Pagination from '@material-ui/lab/Pagination';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
    mainMessage: {
        maxWidth: '50%', 
        fontSize: '20px', 
        textAlign: 'center',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%', 
        }
    },
    pageTitle: {
        color: '#555', 
        textAlign: 'center', 
        padding: '4% 0 2% 0', 
        fontSize: '30px',
        [theme.breakpoints.down('sm')]: {
            padding: '4% 0 5% 0',  
        }
    },
    map: {
        border: '1px solid #000', 
        marginBottom: '15px', 
        width: '600px', 
        height: '350px',
        [theme.breakpoints.down('sm')]: {
            width: '85%',
            height: '200px'
        }
    }
}));

export default function Doado() {
    const classes = useStyles();

    const pos = {
        lat: '67.82543436532767',
        long: '9.970694704824691'
    }

    const mapUrl = "https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d982.3893816689978!2d-"+pos.lat+"!3d-"+pos.long+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e2!4m3!3m2!1d-"+pos.long+"!2d-"+pos.lat+"!4m3!3m2!1d-"+pos.long+"!2d-"+pos.lat+"!5e0!3m2!1spt-BR!2sbr!4v1588062121261!5m2!1spt-BR!2sbr"

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>

                <Grid item xs={12} className={classes.pageTitle}>
                    Confirmação de Doação
                </Grid>
        

                <Grid container>
                    <Grid container item xs={12} alignItems="center" justify="center" direction="column">
                        <div className={classes.mainMessage}>
                            <Typography variant="body2" component="p" style={{ color: "#000", marginBottom: '25px' }} >
                                <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="18px">
                                    Agradecemos sua doação.
                                </Box>
                            </Typography>
                            <Typography variant="body2" component="p" style={{ color: "#000" }} >
                                <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="18px">
                                    O representante da instituição <b>Educandário BCA</b> foi informado sobre sua
                                    disponibilidade para doação dos seguintes itens:
                                </Box>
                            </Typography>
                        </div>

                        <Card style={{ marginBottom: '20px'}}>
                            <CardContent className={classes.content}>
                                <Typography variant="body2" color="textSecondary" component="p" style={{ color: "#247BA0" }} >
                                    <Box fontWeight="fontWeightBold" m={1} textAlign="center">
                                        Produtos de limpeza;<br/>
                                        Cestas básicas;<br/>
                                        Alimentos não perecíveis.<br/>
                                    </Box>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Typography variant="body2" component="p" style={{ color: "#000", marginBottom: '20px' }} >
                            <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="18px">
                                Por gentileza, entre em contato a partir dos seguintes meios:
                            </Box>
                        </Typography>

                        <Card style={{ marginBottom: '25px' }}>
                            <CardContent className={classes.content}>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <PhoneIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item>
                                        (68) 4002-8922
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <EmailIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                    </Grid>
                                    <Grid item>
                                        educandariobca@gmail.com
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        
                        <Typography variant="body2" component="p" style={{ color: "#000", marginBottom: '15px' }} >
                            <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="18px">
                                Localização no Google Maps
                            </Box>
                        </Typography>


                    </Grid>
                        
                    <Grid container item xs={12} alignItems="center" justify="center" direction="column">
                        <iframe src={mapUrl} frameborder="0" className={classes.map} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
}
