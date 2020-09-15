import React from 'react';
import { Switch, Route } from 'react-router-dom'

//Routes container
import Dashboard from "./Dashboard";
import Login from "./Login";

const AppRoutes = () => {
    return (
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' component={Dashboard}/>
        </Switch>
    );
};

export default AppRoutes;
