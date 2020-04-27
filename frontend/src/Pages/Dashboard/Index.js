import React from 'react';
import { Route, Switch } from 'react-router-dom';

//PAGES
import Home from './Home';

export default function Dashboard() {

    return(
        <Switch>
            <Route path="/dashboard" component={Home} />
        </Switch>
    );

}
