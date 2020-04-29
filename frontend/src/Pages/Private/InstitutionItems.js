import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../../Component/Button';

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
        [theme.breakpoints.down('sm')]: {
            width: "90%"
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
    }
}));

export default function Donated() {
    const classes = useStyles();

    const institution = {
        name: "Educandário BCA",
        description: "Somos uma instituição de apoio a crianças órfãs ou em situação de abandono familiar.",
        items: [
            {name: "Cestas básicas"},
            {name: "Produtos de limpeza"},
            {name: "Roupas"},
            {name: "Alimentos não perecíveis"}
        ]
    }


    const [items, setItems] = React.useState([
        {name: "Cestas básicas", checked: false},
        {name: "Produtos de limpeza", checked: false},
        {name: "Roupas", checked: false},
        {name: "Alimentos não perecíveis", checked: false}
    ]);
    
    const handleChange = (event) => {
        setItems({ ...items, [event.target.name]: event.target.checked });
    };

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                <Grid container>
                    <Grid container item xs={12} alignItems="center" justify="center" direction="column">
                        <Grid container item xs={10} sm={6} md={6} alignItems="center" justify="center" direction="column" className={classes.donationFrame}>
                            <Typography variant="body2" component="p" style={{ color: "#000" }} >
                                <Box fontWeight="fontWeightLight" m={1} textAlign="center" fontSize="20px">
                                    Selecione as necessidades de doação
                                </Box>
                            </Typography>

                            <Grid container style={{ padding: 30 }}>
                                <Grid container spacing={4}>
                                    { institution.items.map( item => (
                                        <Grid item xs={12} sm={4} md={6}>
                                            <Card>
                                                <CardContent className={classes.content}>
                                                    <Grid container direction="row" alignItems="center">
                                                        <Grid item>
                                                            <FormControlLabel control={<Checkbox checked={true} onChange={handleChange} color="primary" />} label={item.name} style={{ color: "#247BA0" }}/>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ) )}
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Button variant="contained" style={{ background: '#008B00', boxShadow: '0px 2px 2px rgba(156, 39, 176, 0.2)', borderRadius: '3px', display: 'block', margin: '0vh auto 3vh auto', width: '30vh', height: '6vh', fontSize: '1rem' }}>CONFIRMAR</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
}
