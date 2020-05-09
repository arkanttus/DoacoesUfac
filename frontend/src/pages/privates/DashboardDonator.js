import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InstitutionCard from '../../components/InstitutionCard';
import Pagination from '@material-ui/lab/Pagination';
import MapNextLocations from '../../components/Map/MapNextLocations'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Cities } from "../../components/Cities";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { setInstitution } from '../../services/auth';
import WaitLoading from '../../components/WaitLoading';
import { sendRequest,getInstitutionById } from '../../services/api';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    containerRoot: {
        minHeight: '85vh',
    },
    container: {
        height: 'fit-content'
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
        color: 'grey',
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
    },
    legenda:{
        textAlign: 'center', 
        padding: '10vh 0vh 5vh 0vh', 
        fontSize: '1rem',
        [theme.breakpoints.down('sm')]: {
            padding: '5vh 0vh'
        }
    },
    containerMapSubtitle: {
        display: 'flex',
        justifyContent: 'center'
    },
    subtitle1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 25,
        paddingTop: 23,
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
            paddingRight: 0
        }
    }

}));

export default function Home({props}){
    const classes = useStyles();
    const cities = Cities();
    const itemsEstados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
                "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
                "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
   
    const [uf, setUF] = React.useState("");
    const [citiesArray, setCitiesArray] = React.useState([]);
    const [city, setCity] = React.useState("");
    const [institutions,setInstitutions] = React.useState(null);
    const [loading,setLoading] = React.useState(true)

    async function loadData() {
        let res = await sendRequest("GET", "institutions/", {})
        
        if(res.status == 200) {
            res.data.results.forEach((institution) => {
                institution.items = institution.needDonates.map((need, index) => {
                    let msg = need.typeDonate.name
                    if(index > 0)
                        msg = msg.toLowerCase()
                    if(index != institution.needDonates.length-1)
                        return `${msg}, `;
                    return `${msg}.`;
                })
            })
            setInstitutions(res.data.results)
            setLoading(false)
            

        }
        else
            props.history.push("/dashboard");
    }

    React.useEffect(() => {
        loadData();
    }, []);


    function handleSelectCities(e) {
        setUF(e.target.value);
        setCitiesArray(cities[e.target.value].cidades);
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
                    Mapa das Instituições
                </Grid>
        
                
                <Grid item xs={12}>
                    <MapNextLocations />
                </Grid>
                
                <Grid item xs={12} style={{ maxWidth: '80%', display: 'block', margin: 'auto' }}>
                    <Grid container className={classes.containerMapSubtitle}>
                        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: 23 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <LocationOnIcon style={{ color: "#27AE60" }} />
                                <label >Próximas</label>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <LocationOnIcon style={{ color: "#EB5757" }} />
                                <label >Sem doações</label>
                            </div>
                        </Grid>
                        {/*
                        <Grid item xs={6} sm={3} className={classes.subtitle1}>
                            <LocationOnIcon style={{ color: "#27AE60" }} />
                            <label >Próximas</label>
                        </Grid>
                        <Grid item xs={6} sm={3} style={{ display: 'flex', alignItems: 'center', paddingTop: 23 }}>
                            <LocationOnIcon style={{ color: "#EB5757" }} />
                            <label >Sem doações</label>
                        </Grid>
                         */}
                        
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={2} style={{ display: 'flex', alignItems: 'center', paddingTop: 23 }}>
                                    Filtrar:
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                <FormControl fullWidth>
                                    <InputLabel>Estado </InputLabel>
                                    <Select value={uf} onChange={handleSelectCities} input={<Input/>}>    
                                        {itemsEstados.map((item) => (
                                            <MenuItem key={item} value={item}>
                                            {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                <FormControl fullWidth>
                                    <InputLabel>Cidade *</InputLabel>
                                    <Select value={city} onChange={(e) => setCity(e.target.value)} input={<Input />}>    
                                    {citiesArray ? (citiesArray.map((item) => (
                                        <MenuItem key={item} value={item}>
                                        {item}
                                        </MenuItem>
                                    ))) : (
                                        <></>
                                    )}
                                    </Select>
                                </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </Grid> 
                </Grid>
              
                {
                    /*
                    <Grid >
                    <FormControl >
                        <InputLabel>Estado </InputLabel>
                        <Select value={uf} onChange={handleSelectCities} input={<Input/>}>    
                            {itemsEstados.map((item) => (
                                <MenuItem key={item} value={item}>
                                {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid  style={{paddingLeft:50}}>
                    <FormControl >
                        <InputLabel>Cidade *</InputLabel>
                        <Select value={city} onChange={(e) => setCity(e.target.value)} input={<Input />}>    
                        {citiesArray ? (citiesArray.map((item) => (
                            <MenuItem key={item} value={item}>
                            {item}
                            </MenuItem>
                        ))) : (
                            <></>
                        )}
                        </Select>
                    </FormControl>
                </Grid>
                     */
                }
                

                <Grid container>
                    <Grid item xs={12} className={classes.todasTitle}>
                        Todas as Instituições
                    </Grid>
                </Grid>
                <WaitLoading isLoading={loading} type="spin">
                    <Grid container spacing={4} className={classes.cardContainer}>
                    { institutions ? institutions.map( institution => (
                        <Grid item xs={12} sm={6} md={3} className={classes.cardItem}>
                           <Link to={`doar/${institution.id}`} style={{ textDecoration: 'none' }}>
                                <InstitutionCard title={institution.name} text={institution.items} photo={institution.image}/>
                            </Link>
                        </Grid>


                    )): <></>} 
                    </Grid>
                    
                    <Pagination count={10} color="primary" style={{ display: 'block', margin: '3vh auto 3vh auto' }} />
                 </WaitLoading>
            </Grid>
        </Grid>
    );
}
