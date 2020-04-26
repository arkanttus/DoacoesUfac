import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

//PAGES
import LandingPage from './Pages/Landing';
import ComoDoar from './Pages/ComoDoar';
import Instituicoes from './Pages/Instituicoes';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;