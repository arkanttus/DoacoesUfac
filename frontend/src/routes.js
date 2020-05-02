import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//PAGES
import LandingLayout from './layouts/LandingLayout';
import DashboardLayout from './layouts/DashboardLayout';
import FormLayout from './layouts/FormLayout'; 

import Login from './pages/publics/Login'
import DonatorRegister from './pages/publics/DonatorRegister'
import InstituteRegister from './pages/publics/InstituteRegister'

import Institutions from './pages/publics/Institutions'
import HowToDonate from './pages/publics/HowToDonate'
import Home from './pages/publics/Home'
import AboutTeam from './pages/publics/AboutTeam'
import Credits from './pages/publics/Credits'

import Dashboard from './pages/privates/Dashboard';
import Donated from './pages/privates/Donated';
import Donate from './pages/privates/Donate';
import DonationList from './pages/privates/DonationList';
import MyDonations from './pages/privates/MyDonations';
import ProfileEditDonator from './pages/privates/ProfileEditDonator';
import SelectDonationTypes from './pages/privates/SelectDonationTypes';
import ProfileEditInstitution from './pages/privates/ProfileEditInstitution';

import { isAuthenticated, getUser } from './services/auth';

function RouteWithLayout({layout: Layout, component: Component, ...rest}){
  return (
    <Route {...rest} render={(props) =>
      <Layout>
        <Component props={props}/>
      </Layout>
    }/>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <RouteWithLayout { ...rest} component={(props) => (
      isAuthenticated() ? (
          <Component { ...props}/>
      ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
      )
  )}/>
);

const NotAuthenticateRoute = ({ component: Component, ...rest }) => (
  <RouteWithLayout { ...rest} component={(props) => (
      !isAuthenticated() ? (
          <Component { ...props}/>
      ) : (
          <Redirect to={{ pathname: '/dashboard', state: { from: props.location }}} />
      )
  )}/>
);

const user = getUser();

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <RouteWithLayout exact path="/" layout={LandingLayout} component={Home} />
      <RouteWithLayout path="/instituicoes" layout={LandingLayout} component={Institutions} />
      <RouteWithLayout path="/como-doar" layout={LandingLayout} component={HowToDonate} />
      <RouteWithLayout path="/equipe" layout={LandingLayout} component={AboutTeam} />
      <RouteWithLayout path="/creditos" layout={LandingLayout} component={Credits} />

      <NotAuthenticateRoute path="/login" layout={FormLayout} component={Login} />
      <NotAuthenticateRoute path="/instituicao" layout={FormLayout} component={InstituteRegister} />
      <NotAuthenticateRoute path="/doador" layout={FormLayout} component={DonatorRegister} />

      <PrivateRoute path="/dashboard" layout={DashboardLayout} component={user.typeUser === 'Doador' ? Dashboard : DonationList} />
      <PrivateRoute path="/doacoes" layout={DashboardLayout} component={DonationList} />
      <PrivateRoute path="/minhas-doacoes" layout={DashboardLayout} component={MyDonations} />
      <PrivateRoute path="/doado" layout={DashboardLayout} component={Donated} />
      <PrivateRoute path="/doar/:institutionId" layout={DashboardLayout} component={Donate} />
      <PrivateRoute path="/conta" layout={DashboardLayout} component={user.typeUser === 'Doador' ? ProfileEditDonator : ProfileEditInstitution} />
      <PrivateRoute path="/selecionar-doacoes" layout={DashboardLayout} component={SelectDonationTypes} />
    </Switch>
  </BrowserRouter>
);

export default Routes;