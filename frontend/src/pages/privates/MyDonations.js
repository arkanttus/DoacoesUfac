import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

//Material Kit
import Card from '../../components/MaterialKit/Card/Card';
import CardBody from "../../components/MaterialKit/Card/CardBody";
import CardHeader from "../../components/MaterialKit/Card/CardHeader";

import { Link } from 'react-router-dom';
import WaitLoading from '../../components/WaitLoading';
import { getDonationsByUserId } from '../../services/api';
import { getUser } from '../../services/auth';
import moment from 'moment';

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
        padding: '4vh 0vh 1vh 0vh',
        marginBottom: '20px'
    },
    titulo2: {
        textAlign: 'center',
        fontSize: '1.5rem',
        padding: '2vh 0vh 4vh 0vh'
    },
    gridCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: 'auto!important'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: '2.5vh',
        backgroundColor: '#247BA0',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.56)',
        color: '#FFF'
    },
    noneDonation: {
        color: '#555', 
        textAlign: 'center', 
        padding: '4% 0 2% 0', 
        fontSize: '25px',
        [theme.breakpoints.down('sm')]: {
            padding: '4% 0 5% 0',  
        }
    },
}));

export default function MyDonations({ props  }) {
    const classes = useStyles();
    const user = getUser();
    const [donations, setDonations] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    

    async function loadData() {
        let res = await getDonationsByUserId(user.id)
        if(res) {
            res.results.forEach((donation) => {
                donation.items = donation.needDonates.map((need, index) => {
                    let msg = need.typeDonate.name
                    if(index > 0)
                        msg = msg.toLowerCase()
                    if(index !== donation.needDonates.length-1)
                        return `${msg}, `;
                    return `${msg}.`;
                })
            })
            setDonations(res.results)
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadData();
    }, []);

    function openDonation(id) {
        props.history.push(`doado/${id}`);
    }

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                <WaitLoading isLoading={loading} type="spin" useGrid>
                    <Grid item xs={12} className={classes.titulo1}>
                        <ThumbUpIcon /> Minhas doações
                    </Grid>

                    <Grid container>
                        { donations ? donations.map( donation => (
                            <Grid item xs={12} sm={4} md={3} className={classes.gridCardContainer}>
                                    <Card style={{ width: '19rem', height: 'auto', cursor: 'pointer'}} onClick={() => openDonation(donation.id)}>
                                        <CardHeader className={classes.cardHeader}>
                                            <label>
                                                <strong>Instituição:</strong> {donation.institution.name}
                                            </label>
                                        </CardHeader>
                                        <CardBody>
                                            <p><strong>Doação: </strong>{donation.items}</p>
                                            <p><strong>Data: </strong>{moment(donation.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                            <p><strong>Status: </strong> <label style={donation.donated ? {color: 'green'} : {color: 'red'}}>{donation.donated ? "Confirmada" : "Pendente"}</label></p>
                                        </CardBody>
                                    </Card>
                            </Grid>
                        ) ) : (
                            <Grid item xs={12} className={classes.noneDonation}>
                                Faça já sua primeira doação!
                            </Grid>
                        )}
                    </Grid>
                </WaitLoading>
            </Grid>
        </Grid>
    );
}
