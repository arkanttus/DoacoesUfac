import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

//PAGES
import LandingPage from './Pages/Public/Landing';
import DashboardPage from './Pages/Private/Index';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;