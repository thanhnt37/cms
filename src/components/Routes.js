import React from 'react';
import { Switch, Route } from 'react-router-dom'

//Routes container
import CompleteNewPassword from "./login/complete_new_password";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import Analytics from "./analytics/index";
import Keywords from "./keywords/index";
import Articles from "./articles/index";
import CreateArticle from "./article/create/index";
import EditArticle from "./article/edit/index";

const AppRoutes = () => {
    return (
        <Switch>
            <Route path='/login/complete-new-password' component={CompleteNewPassword}/>
            <Route path='/logout' component={Logout}/>

            <Route path='/articles/create' component={CreateArticle}/>
            <Route path='/articles/:slug' component={EditArticle}/>
            <Route path='/articles' component={Articles}/>

            <Route path='/analytics' component={Analytics}/>

            <Route path='/keywords' component={Keywords}/>

            <Route path='/' component={Dashboard}/>
        </Switch>
    );
};

export default AppRoutes;
