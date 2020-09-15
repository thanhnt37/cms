import React from 'react';
import { Switch, Route } from 'react-router-dom'

//Routes container
import Dashboard from "./Dashboard";
import Logout from "./Logout";

const AppRoutes = () => {
    return (
        <Switch>
            <Route path='/logout' component={Logout}/>
            <Route path='/' component={Dashboard}/>
        </Switch>
    );
};

export default AppRoutes;
