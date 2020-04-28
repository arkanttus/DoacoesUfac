import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '../../Component/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

//Material Kit
import Card from '../../Component/MaterialKit/Card/Card';
import CardBody from "../../Component/MaterialKit/Card/CardBody";
import CardHeader from "../../Component/MaterialKit/Card/CardHeader";

const PurpleSwitch = withStyles({
    switchBase: {
      color: '#FFF',
      '&$checked': {
        color: '#FFF',
      },
      '&$checked + $track': {
        backgroundColor: '#27AE60',
      },
    },
    checked: {},
    track: {},
  })(Switch);

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
        justifyContent: 'center'
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

}));

export default function MyDonations() {
    const classes = useStyles();

    let donations = []
    for(let i = 0; i < 10; i++) {
        donations.push({
            name: "José Fulano",
            text: "Cesta Básica",
            date: "22/07/1999"
        })
    }

    const [state, setState] = React.useState({
        checked: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    return(
        <Grid container className={classes.containerRoot}>
            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.titulo1}>
                    <ThumbUpIcon /> Minhas doações
                </Grid>

                <Grid container>
                    { donations.map( donation => (
                        <Grid item xs={12} sm={4} md={3} className={classes.gridCardContainer}>
                            <Card style={{ width: '19rem'}}>
                                <CardHeader className={classes.cardHeader}>
                                    <label>
                                        <strong>Instituição:</strong> {donation.name}
                                    </label>
                                </CardHeader>
                                <CardBody>
                                    <p><strong>Doação: </strong>{donation.text}</p>
                                    <p><strong>Data: </strong>{donation.date}</p>
                                </CardBody>
                            </Card>
                        </Grid>
                    ) )}
                </Grid>
            </Grid>
        </Grid>
    );
}
