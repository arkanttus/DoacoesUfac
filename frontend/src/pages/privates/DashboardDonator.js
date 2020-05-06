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

    }

}));

export default function Home() {
    const classes = useStyles();
    let institutions = []

    const cities = Cities();
    const itemsEstados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
                "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
                "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]
   
    const [uf, setUF] = React.useState("");
    const [citiesArray, setCitiesArray] = React.useState([]);
    const [city, setCity] = React.useState("");

    function handleSelectCities(e) {
        setUF(e.target.value);
        setCitiesArray(cities[e.target.value].cidades);
    }

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
                    Mapa das Instituições
                </Grid>
        
                {/* MAPA*/}
                <Grid container>
                    <Grid item xs={12}>
                       <MapNextLocations>
                       </MapNextLocations>
                    </Grid>
                </Grid>
                <Grid style={{paddingLeft:350}} >
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

                <Grid container style={{ marginLeft:120, marginTop:20}}> 
                        <LocationOnIcon style={{ color: "#27AE60" }} />
                        <label >Próximas</label>
                        <LocationOnIcon style={{ color: "#EB5757" }} />
                        <label >Sem doações</label>
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
