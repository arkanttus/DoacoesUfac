import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

//Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

//Components
import Button from '../../components/Button';

const useStyles = makeStyles((theme) => ({

    containerRoot: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        width: '65vh',
        [theme.breakpoints.down('xs')]: {
            width: '45vh',
        }
    },
    cardRoot: {
        width: '100%',
        height: '100%'
    },
    CardContent: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 0
    },
    cardTitle: {
        textAlign: 'center',
        margin: 0
    }

}));

export default function EmailValidation() {
    const classes = useStyles();
    let { id } = useParams();
    let { token } = useParams();
    console.log("id: " + id);
    console.log("token: " + token);
    const [validation, setValidation] = React.useState(20);

    return(
        <div className={classes.containerRoot}>
            {validation === null ? (
                <div className={classes.container}>
                    <CircularProgress style={{ width: '10vh', height: '10vh' }} />
                    <label style={{ fontSize: '1.2rem', paddingTop: 20 }}>Aguarde...</label>
                </div>
            ) : (

                <div className={classes.container}>
                    
                    <Card className={classes.cardRoot}>
                        {
                            validation === 200 ? (
                                <CardContent className={classes.CardContent}>
                                    <Typography className={classes.cardTitle} variant="h3" gutterBottom>
                                        Email Verificado
                                    </Typography>
                                    <CheckCircleIcon style={{ color: 'green', width: '10vh', height: "10vh" }} />
                                    <Button variant="green" style={{ width: "80%", height: "15%", fontSize: '1.2rem' }}>FAZER LOGIN</Button>
                                </CardContent>
                            ) : (
                                <CardContent className={classes.CardContent} style={{ justifyContent: 'space-evenly' }}>
                                    <Typography className={classes.cardTitle} variant="h3" gutterBottom>
                                        Algo deu errado!
                                    </Typography>
                                    <ErrorIcon style={{ color: 'red', width: '20vh', height: "15vh" }} />
                                    <Typography className={classes.cardTitle} variant="h3" gutterBottom>
                                        Tente novamente!
                                    </Typography>
                                </CardContent>
                            )
                        }  
                    </Card>
                    
                </div>
                

            )}
        </div>
    );

}
