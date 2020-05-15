import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../../components/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { sendRequest,getInstitutionById } from '../../services/api';
import WaitLoading from '../../components/WaitLoading';
import { getInstitution,setInstitution } from '../../services/auth';

import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    containerRoot: {
        minHeight: '85vh',
        '& div': {
            height: 'fit-content'
        },
        display: 'flex',
        alignItems: 'center'
    },
    container: {
        height: 'fit-content'
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

export default function SelectDOnationTypes({ props }) {
    const classes = useStyles();
    const [items, setItems] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const Swal = require('sweetalert2');
    const institution = getInstitution();

    async function loadData() {
        let res = await sendRequest("GET", "type_donates/", {})
    
        if(res.status === 200) {
            res.data.results.forEach(function(name) {
                name.checked = false
                name.description= ""
            });
            
            if (institution.needDonates){
                institution.needDonates.forEach( needDonate=>{
                    const typeDonate = res.data.results.find(item=> item.id===needDonate.typeDonate.id)
                    typeDonate.checked = true
                    typeDonate.description = needDonate.description
    
                });
            }
           

            setItems(res.data.results)
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

    const handleChangeDescription = (itemId, description) => {
        const newItems = items.map(item => {
            if(itemId === item.id) {
                item.description = description
                
            }
            return item
        });
        setItems(newItems)
    };

    async function handleSubmit() {
        const filter = items.filter(item => item.checked === true)
        const response = await sendRequest("POST", `need_donates/`, { 
            setTypeDonates: filter.map(obj => { return obj.id }), 
            setDescriptions: filter.map(obj => { return obj.description }) })

        if(response.status === 201) {
            Swal.fire({
                title: "Os itens solicitados foram atualizados!",
                text: "Sucesso!",
                icon: "success",
                confirmButtonText: "Ok"
            });
            setInstitution(await getInstitutionById(institution.id))
        }
        else {
            Swal.fire({
                title: "Não foi possível efetuar a doação :(",
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
                    <Container maxWidth="md">
                        <Grid container item xs={12} alignItems="center" justify="center" direction="column" className={classes.donationFrame}>
                            <Typography variant="body2" component="p" style={{ color: "#000" }} >
                                <Box m={1} textAlign="center" fontSize="20px" color="#247BA0" fontWeight="bold" padding="10px">
                                    Selecione as necessidades de doação
                                </Box>
                            </Typography>

                            <Grid container style={{ padding: 30}}>
                                <Grid container spacing={4} >
                                    {items ? items.map( item => (
                                        <Grid item xs={12} sm={4} md={6}>
                                            <Card>
                                                <CardContent className={classes.content}>
                                                    <Grid container direction="row" alignItems="center"> 
                                                            <FormControlLabel control={<Checkbox checked={item.checked} onChange={() => handleChange(item.id)} color="primary" />} label={item.name} style={{ color: "#247BA0" }}/>                                       
                                                            {
                                                                item.checked===true ?
                                                                 (  
                                                                    <TextField  value={item.description}  onChange={(e) => handleChangeDescription(item.id,e.target.value)}  style={{width:'100%'}} size='small' id="standard-basic" label="Observações:(opcional)" />
                                                                     
                                                                 )

                                                                 : (<></>)
                                                            }   
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )) : <></>}
                                    
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Button onClick={handleSubmit} variant="contained" style={{ background: '#008B00', boxShadow: '0px 2px 2px rgba(156, 39, 176, 0.2)', borderRadius: '3px', display: 'block', margin: '0vh auto 3vh auto', width: '30vh', height: '6vh', fontSize: '1rem' }}>CONFIRMAR</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </WaitLoading>
            </Grid>
        </Grid>
    );

}

