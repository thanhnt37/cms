import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { actions as authenticateActions } from './actions/authenticate';
import Login from './components/Login';
import AppRoutes from "./components/Routes";

const _ = require('lodash');

const Loading = <h1>Loading ...</h1>

class Application extends Component {

    constructor(props) {
        super(props);

        this.state = {
            globalMessages: {
                type: '',
                message: '',
            },
            pageLoading: false
        };
    }

    componentDidMount() {
        console.log('this.props.location.pathname: ', this.props.location.pathname);
        this.props.requestAuthenticate(this.props.location.pathname);
    }

    render() {
        if(this.props.authenticate.authUser === null) {
            return <h1>Loading ...</h1>
        } else if(_.has(this.props.authenticate, 'authUser') && !_.isEmpty(this.props.authenticate.authUser)) {
            if(_.has(this.props.authenticate, 'authUser.challengeName') && !_.isEmpty(this.props.authenticate.authUser.challengeName) && this.props.location.pathname !== '/auth-challenges/change-password') {
                return <Redirect to="/auth-challenges/change-password"/>
            } else {
                if(this.props.location.pathname === '/login') {
                    if(this.props.authenticate.pathBeforeAuthenticate === '/login') {
                        return <Redirect to="/"/>
                    } else {
                        return <Redirect to={this.props.authenticate.pathBeforeAuthenticate}/>
                    }
                } else if(this.props.location.pathname === '/auth-challenges/change-password' && _.isEmpty(this.props.authenticate.authUser.challengeName)) {
                    return <Redirect to="/"/>
                }
            }

            return (
                <div id="Application">
                    <AppRoutes />
                </div>
            );
        } else if(this.props.location.pathname !== '/login') {
            return <Redirect to="/login"/>
        }
        else {
            return <Login />
        }
    }
}

const mapStateToProps = state => ({
    authenticate: state.authenticate
});

const actions = {
    requestAuthenticate: authenticateActions.requestAuthenticate
};

export default withRouter(
    connect(mapStateToProps, actions)(Application)
);
