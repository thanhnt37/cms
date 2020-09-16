import React from 'react';
import { Switch, Route } from 'react-router-dom'

//Routes container
import Dashboard from "./Dashboard";
import Articles from "./Articles";
import Logout from "./Logout";
import CompleteNewPassword from "./login/complete_new_password";

const AppRoutes = () => {
    return (
        <Switch>
            <Route path='/login/complete-new-password' component={CompleteNewPassword}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/articles' component={Articles}/>
            <Route path='/' component={Dashboard}/>
        </Switch>
    );
};

export default AppRoutes;
