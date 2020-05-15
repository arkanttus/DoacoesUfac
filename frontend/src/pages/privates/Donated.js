import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import WaitLoading from '../../components/WaitLoading';
import MapViewer from '../../components/Map/MapViewer';
import Button from '@material-ui/core/Button';
import { getDonationById } from '../../services/api';

const useStyles = makeStyles((theme) => ({
    containerRoot: {
        minHeight: '85vh',
        '& div': {
            
        }
    },
    container: {
        height: 'fit-content'
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
    },
    content: {
        padding: "5px 20px !important",
    }
}));

export default function Donated({ props }) {
    const classes = useStyles();
    const [donation, setDonation] = React.useState({ institution: { name: "" }})
    const [loading, setLoading] = React.useState(true)

    async function loadData() {
        let res = await getDonationById(props.match.params.donationId)
        if(res) {
            setDonation(res)
            setLoading(false)
        }
        else
            props.history.push("/dashboard");
    }

    React.useEffect(() => {
        loadData();
    }, []);

    const mapUrl = `https://www.google.com/maps?q=${donation.institution.latitude},${donation.institution.longitude}`;

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                <WaitLoading isLoading={loading} type="spin" useGrid>
                    <Grid item xs={12} className={classes.pageTitle}>
                        Confirmação de Doação
                    </Grid>

                    <Grid container alignItems="center" justify="center">
                        <Grid container item xs={12} alignItems="center" justify="center" direction="column">
                            <div className={classes.mainMessage}>
                                <Typography variant="body2" component="p" style={{ color: "#000", marginBottom: '25px' }} >
                                    <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="18px">
                                        Agradecemos sua doação.
                                    </Box>
                                </Typography>
                                <Typography variant="body2" component="p" style={{ color: "#000" }} >
                                    <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="18px">
                                        O representante da instituição <b>{donation.institution.name}</b> foi informado sobre sua
                                        disponibilidade para doação dos seguintes itens:
                                    </Box>
                                </Typography>
                            </div>

                            <Card style={{ marginBottom: '20px'}}>
                                <CardContent className={classes.content}>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{ color: "#247BA0" }} >
                                        <Box fontWeight="fontWeightBold" m={1} textAlign="center">
                                            { donation.needDonates ? donation.needDonates.map( item => (
                                                <label>{item.typeDonate.name};<br/></label>
                                            ) ) : <></>}
                                        </Box>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                            
                        <Grid container item md={4} sm={12} alignItems="center" justify="center" direction="column">
                            <Typography variant="body2" component="p" style={{ color: "#000", marginBottom: '20px' }} >
                                <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="18px" color="red">
                                    Por favor, entre em contato com a instituição, para combinar uma data e horário, a partir dos meios:
                                </Box>
                            </Typography>

                            <Card style={{ marginBottom: '25px' }}>
                                <CardContent className={classes.content}>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item>
                                            <PhoneIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                        <Grid item>
                                            {donation.institution.owner ? donation.institution.owner.phoneNumber : ""}
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item>
                                            <EmailIcon style={{ color: "#555", marginLeft: -8, marginRight: 20 }} />
                                        </Grid>
                                        <Grid item>
                                            {donation.institution.owner ? donation.institution.owner.email : ""}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                <Button variant="contained" color="primary" >ABRIR NO GOOGLE MAPS</Button>
                            </a>
                        </Grid>

                        <Grid container item md={4} sm={12} alignItems="center" justify="center" direction="column">
                            <Typography variant="body2" component="p" style={{ color: "#000", marginBottom: '15px', marginTop: '20px' }} >
                                <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="18px">
                                    Localização no Mapa
                                </Box>
                            </Typography>
                            <MapViewer institution={donation.institution}/>
                        </Grid>
                    </Grid>

                </WaitLoading>
            </Grid>
        </Grid>
    );
}
