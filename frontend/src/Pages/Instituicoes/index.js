import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonCustom from '../../Component/Button';
import InitialNavbar from '../../Component/InitialNavbar';
import InitialFooter from '../../Component/InitialFooter';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


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
}));

export default function Landing() {
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <InitialNavbar />
            </Grid>
            
            <Grid item xs={12} sm={5}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia component="img" alt="Contemplative Reptile" height="140" image="/images/Logo.svg" title="Contemplative Reptile"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={2}></Grid>

            <Grid item xs={12} sm={5} className={classes.textos2}>
                <label>Você é responsável por alguma instituição e está necessitando de recursos? Junte-se a nós!</label>
                <Link to="/registro-instituicao" className={classes.noLinkStyle}>
                    <ButtonCustom variant="blueDark" style={{ margin: '0 auto', marginTop: 15 }}>
                        CADASTRAR INSTITUIÇÃO
                    </ButtonCustom>
                </Link>
            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to="/login" className={classes.noLinkStyle}>
                    <ButtonCustom variant="green">
                        ACESSAR MINHA CONTA
                    </ButtonCustom>
                </Link>
            </Grid>

            <Grid item xs={12}>
                <InitialFooter/>
            </Grid>
        </Grid>
    );
}
