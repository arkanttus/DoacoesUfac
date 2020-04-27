import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

//PAGES
import LandingPage from './Pages/Landing';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;