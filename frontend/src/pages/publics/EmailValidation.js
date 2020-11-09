import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import { useParams } from 'react-router-dom';

//Material UI
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import CheckIcon from '@material-ui/icons/Check';

//Components
import Button from '../../components/Button';
import Card from '../../components/MaterialKit/Card/Card';
import CardHeader from '../../components/MaterialKit/Card/CardHeader';
import CardBody from '../../components/MaterialKit/Card/CardBody';

const useStyles = makeStyles((theme) => ({

    containerRoot: {
        height: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    cardHeader: {
        textAlign: 'center',
        fontSize: 25,
        padding: '12px 11px',
        boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.12), 0px 5px 15px rgba(0, 0, 0, 0.5)',
        color: '#FFF'
    },
    cardHeaderSuccess: {
        backgroundColor: '#27AE60',
    },
    cardHeaderDanger: {
        backgroundColor: 'red',
    },
    cardText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        padding: '25px 0px'
    }

}));

export default function EmailValidation() {
    const classes = useStyles();
    //let { id } = useParams();
    //let { token } = useParams();

    const [validation] = React.useState(20);


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
                        <CardHeader className={validation === 200 ? [classes.cardHeader + ' ' + classes.cardHeaderSuccess] : [classes.cardHeader + ' ' +  classes.cardHeaderDanger]}>VERIFICAÇÃO</CardHeader>
                        {
                            validation === 200 ? (
                                <CardBody>
                                    <Typography className={classes.cardText} variant="h5" gutterBottom>
                                       <CheckIcon style={{ paddingRight: 5}} /> Email Verificado
                                    </Typography>
                                    <Button variant="green" style={{ backgroundColor: '#27AE60', display: 'block', margin: 'auto', width: '25vh' }}>Login</Button>
                                </CardBody>
                            ) : (
                                <CardBody>
                                    <Typography className={classes.cardText} style={{ textAlign: 'center' }} variant="h6" gutterBottom>
                                        Aconteceu um erro com o seu código
                                    </Typography>
                                </CardBody>
                            )
                        }  
                    </Card>
                    
                </div>
                

            )}
        </div>
    );

}
