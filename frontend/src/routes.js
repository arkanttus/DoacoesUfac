import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

//PAGES
import LandingPage from './Pages/Landing';
import ComoDoar from './Pages/ComoDoar';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/ComoDoar" component={ComoDoar} />
    </Switch>
  </BrowserRouter>
);

export default Routes;