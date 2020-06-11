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
import EmailValidation from './pages/publics/EmailValidation';

import Home from './pages/publics/Home'
import Credits from './pages/publics/Credits'
import Contact from './pages/publics/Contact'


import Dashboard from './pages/privates/Dashboard';
import Logout from './pages/privates/Logout';
import Donated from './pages/privates/Donated';
import Donate from './pages/privates/Donate';
import DonationList from './pages/privates/DonationList';
import SelectDonationTypes from './pages/privates/SelectDonationTypes';
import MyDonations from './pages/privates/MyDonations';
import ProfileEdit from './pages/privates/ProfileEdit';

import { isAuthenticated, } from './services/auth';

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

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <RouteWithLayout path="/creditos" layout={LandingLayout} component={Credits} />
      <RouteWithLayout path="/contato" layout={LandingLayout} component={Contact} />
      <RouteWithLayout path="/validar-email/:id/:token" layout={FormLayout} component={EmailValidation} />

      <NotAuthenticateRoute path="/login" layout={FormLayout} component={Login} />
      <NotAuthenticateRoute path="/instituicao" layout={FormLayout} component={InstituteRegister} />
      <NotAuthenticateRoute path="/doador" layout={FormLayout} component={DonatorRegister} />
      
      <PrivateRoute path="/dashboard" layout={DashboardLayout} component={Dashboard} />
      <PrivateRoute path="/sair" layout={DashboardLayout} component={Logout} />
      <PrivateRoute path="/minhas-doacoes" layout={DashboardLayout} component={MyDonations} />
      <PrivateRoute path="/doado/:donationId" layout={DashboardLayout} component={Donated} />
      <PrivateRoute path="/doar/:institutionId" layout={DashboardLayout} component={Donate} />
      <PrivateRoute path="/conta" layout={DashboardLayout} component={ProfileEdit} />

      <PrivateRoute path="/doacoes" layout={DashboardLayout} component={DonationList} />
      <PrivateRoute path="/solicitacoes" layout={DashboardLayout} component={SelectDonationTypes} />
    </Switch>
  </BrowserRouter>
);

export default Routes;