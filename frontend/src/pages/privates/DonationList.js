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
import moment from 'moment';

//api
import api,  { sendRequest, getDonations } from "../../services/api";

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
    const Swal = require('sweetalert2');
    const [donations, setDonations] = React.useState([]);

    async function loadData() {
        let response = await getDonations();
        if(response) {
            console.log(response)
            response.results.forEach((donation) => {
                donation.items = donation.needDonates.map((need, index) => {
                    let msg = need.typeDonate.name
                    if(index > 0)
                        msg = msg.toLowerCase()
                    if(index !== donation.needDonates.length-1)
                        return `${msg}, `;
                    return `${msg}.`;
                })
            })
            setDonations(response.results);
        }
    }

    React.useEffect(() => {
        loadData()
    }, []);

    const [state, setState] = React.useState({
        checked: false,
      });
    
      const handleChange = (donation) => {
        Swal.fire({
            title: 'Deseja confirmar esta doação?',
            text: "Não será possível cancelar, futuramente.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
          }).then((result) => {
            if (result.value) {
                api.patch('/donates/' + donation.id + '/', {donated: true}).then(response => {
                    if(response.status === 200) {
                        donation.donated = true
                        const newDonations = donations.map(d => {
                            if(d.donator.id === donation.donator.id) {
                                d.donator.totalDonations += 1;
                            }
                            return d
                        });
                        setDonations(newDonations);
                        Swal.fire({
                            title: 'Confirmado!',
                            icon: 'success'
                        });
                    } else {
                        Swal.fire({
                            title: '1Aconteceu um erro. Tente novamente mais tarde!',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
            }).catch(err => {
                Swal.fire({
                    title: 'Aconteceu um erro. Tente novamente mais tarde!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
            }
          })
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
                            <Card style={{backgroundColor:"#ECE9E9",width: "19rem", height: "100%"}}>
                                <CardHeader className={classes.cardHeader}>
                                    <label>
                                        <strong>Doador:</strong> {donation.donator.name}
                                    </label>
                                    { donation.donated === true ? (
                                            <IconButton>
                                                <FavoriteIcon style={{ color:"#E53935", marginRight: -8 }}/>
                                            </IconButton>
                                        ) : ( 
                                            <IconButton onClick={() => handleChange(donation)}>
                                                <FavoriteBorderIcon style={{color:"#ffffff", marginRight: -8 }} />
                                            </IconButton>      
                                        ) 
                                    }
                                   
                                </CardHeader>
                                <CardBody>
                                    <p><strong>Doação: </strong>{donation.items}</p>
                                    <p><strong>Data: </strong>{moment(donation.createdAt).format('DD/MM/YYYY')}</p>
                                    <Grid style={{ display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
                                        <label> {donation.donator.totalDonations} </label>
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
