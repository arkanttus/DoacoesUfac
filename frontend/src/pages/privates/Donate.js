import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../../components/Button';
import WaitLoading from '../../components/WaitLoading';
import { getInstitutionById, sendRequest } from '../../services/api';
import Modal from '@material-ui/core/Modal';
import ReCAPTCHA from "react-google-recaptcha";

//ICONS
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

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

    descriptionText: {
        color: "#000",
        maxWidth: "40%",
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '90%', 
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
    institutionPhoto: {
        boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 10px rgba(0, 0, 0, 0.56)',
        maxWidth: "30%",
        [theme.breakpoints.down('sm')]: {
            maxWidth: "70%",
        }
    },
    donationFrame: {
        background: '#DEDEDE',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '47px',
        marginBottom: '30px'
    },
    content: {
        padding: "0px 10px !important",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    facebookIcon: {
        width: '2rem',
        height: '2rem',
        '&:hover': {
            color: '#4267B2',
            cursor: 'pointer'
        }
    },
    instagramIcon: {
        width: '2rem',
        height: '2rem',
        '&:hover': {
            color: '#F56040',
            cursor: 'pointer'
        }
    },
    twitterIcon: {
        width: '2rem',
        height: '2rem',
        '&:hover': {
            color: '#1DA1F2',
            cursor: 'pointer'
        }
    }

}));

export default function Donate({ props }) {
    const classes = useStyles();
    const [institution, setInstitution] = React.useState({})
    const [items, setItems] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [open, setOpen] = React.useState(false)
    const institutionId = props.match.params.institutionId;
    const Swal = require('sweetalert2');
    console.log(institution);

    async function loadData() {
        let res = await getInstitutionById(institutionId)
        if(res) {
            setInstitution(res)

            res.needDonates.forEach(function(name) {
                name.checked = false
            });

            setItems(res.needDonates)
            setLoading(false)
        }
        else
            props.history.push("/dashboard");
    }

    React.useEffect(() => {
        loadData();
    }, []);
    
    const handleChange = (itemId) => {
        const newItems = items.map(item => {
            if(itemId === item.id) {
                item.checked = !item.checked
            }
            return item
        });
        setItems(newItems)
    };

    async function onChangeRecaptcha (value) {
        await handleSubmit(value)
    }

    async function handleSubmit(captcha) {
        let actives = items.filter(obj => obj.checked === true)
        if(actives.length === 0) {
            Swal.fire({
                title: "Selecione uma doação!",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        const response = await sendRequest("POST", `donates/`, { setNeedDonates: actives.map(obj => { return obj.id }), setInstitution: institutionId, "g-recaptcha-response": captcha })
        
        if(response.status === 201) {
            props.history.push("/doado/"+response.data.id);
        }
        else {
            Swal.fire({
                title: "Não foi possível efetuar a doação!",
                text: "Falha",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                <WaitLoading isLoading={loading} type="spin" useGrid>
                    <Grid item xs={12} className={classes.pageTitle}>
                        {institution.name}
                    </Grid>

                    <Grid container>
                        <Grid container item xs={12} alignItems="center" justify="center" direction="column" style={{ marginBottom: '25px' }}>
                            <img src={institution.image} className={classes.institutionPhoto} alt="logo"/>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" justify="center" direction="column">
                            <Typography variant="body2" component="p" className={classes.descriptionText} >
                                <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="22px">
                                    “{institution.description}“
                                </Box>
                                <Box fontWeight="fontWeightLight" style={{ display: 'flex', justifyContent: 'center' }} m={1}>
                                    {institution.linkFacebook ? (
                                        <a href={institution.linkFacebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: 10, color: '#000' }}>
                                            <FacebookIcon className={classes.facebookIcon} />
                                        </a>
                                    ) : (
                                        <div></div>
                                    )}
                                    {institution.linkInstagram ? (
                                        <a href={institution.linkInstagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#000' }}>
                                            <InstagramIcon className={classes.instagramIcon} />
                                        </a>
                                    ) : (
                                        <div></div>
                                    )}
                                    {institution.linkTwitter ? (
                                        <a href={institution.linkTwitter} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginLeft: 10, color: '#000' }}>
                                            <TwitterIcon className={classes.twitterIcon} />
                                        </a>
                                    ) : (
                                        <div></div>
                                    )}
                                </Box>
                            </Typography>
                            { institution && items.length > 0 ? (
                                <>
                                    <Grid container item xs={10} sm={6} md={6} alignItems="center" justify="center" direction="column" className={classes.donationFrame}>
                                        <Typography variant="body2" component="p" style={{ color: "#000" }} >
                                            <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="20px">
                                                Como irá ajudar esta instituição?
                                            </Box>
                                        </Typography>

                                        <Grid container style={{ padding: 30 }}>
                                            <Grid container spacing={4}>
                                                { items.map( (item) => (
                                                    <Grid item xs={12} sm={12} md={6}>
                                                        <Card>
                                                            <CardContent className={classes.content}>
                                                                <Grid container direction="row" alignItems="center">
                                                                    <Grid item xs={12}>
                                                                        <FormControlLabel control={<Checkbox checked={item.checked} onChange={() => handleChange(item.id)} color="primary" />} label={item.typeDonate.name} style={{ color: "#247BA0" }}/>
                                                                    </Grid>
                                                                    <Grid item style={{ fontSize: "14px" }}>
                                                                        {item.description}
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>

                                        <Grid item>
                                            <Button onClick={() => setOpen(true)} variant="contained" style={{ background: '#008B00', boxShadow: '0px 2px 2px rgba(156, 39, 176, 0.2)', borderRadius: '3px', display: 'block', margin: '0vh auto 3vh auto', width: '30vh', height: '6vh', fontSize: '1rem' }}>CONFIRMAR</Button>
                                        </Grid>
                                    </Grid>
                                </>
                                ) : (
                                    <Grid item>
                                        <Typography variant="body2" component="p" style={{ color: "#2e7d32" }} >
                                            <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="20px">
                                                Agradecemos sua disposição, mas não precisamos de doações no momento. <br/>Por favor, ajude outra instituição!
                                            </Box>
                                        </Typography>
                                    </Grid>
                                )}
                        </Grid>
                    </Grid>
                </WaitLoading>
            </Grid>

            <Modal open={open} aria-labelledby="server-modal-title" aria-describedby="server-modal-description" onClose={() => setOpen(false)} className={classes.modal}>
                <ReCAPTCHA sitekey="6LfNRPUUAAAAAKDYI9Jlq9bUxyHoGMLj4j_XestT" onChange={onChangeRecaptcha}/>
            </Modal>
        </Grid>
    );
}
