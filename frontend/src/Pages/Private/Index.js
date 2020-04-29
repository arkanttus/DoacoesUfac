import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../Component/Footer';

//PAGES
import Home from './Home';
import Donated from './Donated';
import Donate from './Donate';
import DashboardNavbar from '../../Component/DashboardNavbar';
import DonationList from './DonationList';
import MyDonations from './MyDonations';
import ProfileEditDonator from './ProfileEditDonator';
import SelectDonationTypes from './SelectDonationTypes';
import ProfileEditInstitution from './ProfileEditInstitution';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: '8vh'
    },
    leftSide: {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: '7.5vh',
            marginRight: 5
        },
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#247BA0',
            color: '#FFF',
            margin: '-20px -10px 20px -10px',
            padding: 3,
            display: 'flex',
            justifyContent: 'center'
        }
    },
    NavBarButtons: {
        color: '#FFF',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            color: '#000',
            margin: '5px 0',
            '& span svg': {
                paddingRight: 5
            }
        }
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    

    return(
        <div>
            <DashboardNavbar />
            <main className={classes.main}>
                <Switch>
                    <Route exact path="/dashboard/doacoes" component={DonationList} />
                    <Route exact path="/dashboard/minhas-doacoes" component={MyDonations} />
                    <Route exact path="/dashboard/doado" component={Donated} />
                    <Route exact path="/dashboard/doar" component={Donate} />
                    <Route path="/dashboard/meu-perfil-doador" component={ProfileEditDonator} />
                    <Route path="/dashboard/meu-perfil-instituicao" component={ProfileEditInstitution} />
                    <Route path="/dashboard/selecionar-doacoes" component={SelectDonationTypes} />
                    <Route path="/dashboard" component={Home} />
                </Switch>
                <Footer/>
            </main>
        </div>
        
    );

}
