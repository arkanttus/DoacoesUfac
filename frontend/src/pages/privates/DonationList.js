import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
//Material Kit
import Card from '../../components/MaterialKit/Card/Card';
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";

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
    titulo1: {
        textAlign: 'center',
        fontSize: '2rem',
        padding: '4vh 0vh 1vh 0vh'
    },
    titulo2: {
        textAlign: 'center',
        fontSize: '1.5rem',
        padding: '2vh 0vh 4vh 0vh'
    },
    gridCardContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: '2.5vh',
        backgroundColor: '#247BA0',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.56)',
        color: '#fff'
    },

}));

export default function ListDonation() {
    const classes = useStyles();

    let donations = []
    for(let i = 0; i < 10; i++) {
        donations.push({
            name: "José Fulano",
            text: "Cesta Básica",
            date: "22/07/1999"
        })
    }

    const [state, setState] = React.useState({
        checked: true,
      });
    
      const handleChange = (event) => {
        //setState({ ...state, [event.target.name]: event.target.checked });
        setState({ checked:! state.checked })
      };

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.titulo1}>
                    Lista de doações
                </Grid>
                <Grid item xs={12} className={classes.titulo2}>
                    Confirme se a doação foi efetuada
                </Grid>

                <Grid container>
                    { donations.map( donation => (
                        <Grid item xs={12} sm={4} lg={3}  className={classes.gridCardContainer}>
                            <Card style={{backgroundColor:"#ECE9E9",width: "19rem"}}>
                                <CardHeader className={classes.cardHeader}>
                                    <label>
                                        <strong>Doador:</strong> {donation.name}
                                    </label>
                                    { state.checked === true ? (
                                            <IconButton onClick={handleChange} >  
                                                    <FavoriteIcon style={{ color:"#E53935", marginRight: -8 }}/>
                                            </IconButton>
                                        ) : ( 
                                            <IconButton onClick={handleChange} >
                                                <FavoriteBorderIcon style={{color:"#ffffff", marginRight: -8 }} />
                                            </IconButton>      
                                        ) 
                                    }
                                   
                                </CardHeader>
                                <CardBody>
                                    <p><strong>Doação: </strong>{donation.text}</p>
                                    <p><strong>Data: </strong>{donation.date}</p>
                                    <Grid style={{ display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
                                        <label> 2410 </label>
                                        <FavoriteIcon style={{ color:"#E53935", marginRight: -8, marginLeft: 5 }}/>     
                                    </Grid>
                                </CardBody>
                            </Card>
                        </Grid>
                    ) )}
                </Grid>

            </Grid>
        </Grid>
    );
}
