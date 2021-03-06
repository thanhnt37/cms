import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Snackbar, Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { actions as authenticateActions } from './actions/authenticate';
import { actions as globalMessageActions } from './actions/globalMessages';
import Layout from './components/layout/index';
import Login from './components/login/index';
import AppRoutes from "./components/Routes";

const _ = require('lodash');

const Loading = () => {
    return (
        <Backdrop open={true} style={{zIndex: '99999'}}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

const GlobalMessage = ({type, message, handleCloseToast}) => {
    return (
        <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={type !== ''}
            onClose={handleCloseToast}
        >
            <Alert severity={type}>{message}</Alert>
        </Snackbar>
    );
}

class Application extends Component {

    constructor(props) {
        super(props);

        this.state = {
            globalMessages: {
                type: '',
                message: '',
            },
            pageLoading: true
        };
    }

    componentDidMount() {
        this.props.requestAuthenticate(this.props.location.pathname);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            globalMessages: nextProps.globalMessages,
            pageLoading: nextProps.pageLoading
        };
    }

    _closeToast = () => {
        this.props.resetAllMessage()
    }

    render() {
        if(this.props.authenticate.authUser === null) {
            return <Loading />
        } else if(_.has(this.props.authenticate, 'authUser') && !_.isEmpty(this.props.authenticate.authUser)) {
            if(_.has(this.props.authenticate, 'authUser.challengeName') && !_.isEmpty(this.props.authenticate.authUser.challengeName) && this.props.location.pathname !== '/login/complete-new-password') {
                return <Redirect to="/login/complete-new-password"/>
            } else {
                if(this.props.location.pathname === '/login') {
                    if(this.props.authenticate.pathBeforeAuthenticate === '/login') {
                        return <Redirect to="/"/>
                    } else {
                        return <Redirect to={this.props.authenticate.pathBeforeAuthenticate}/>
                    }
                } else if(this.props.location.pathname === '/login/complete-new-password' && _.isEmpty(this.props.authenticate.authUser.challengeName)) {
                    return <Redirect to="/"/>
                }
            }

            return (
                <Layout>
                    {this.state.pageLoading && <Loading />}
                    { this.state.globalMessages.type && <GlobalMessage {...this.state.globalMessages} handleCloseToast={this._closeToast} /> }

                    <AppRoutes />
                </Layout>
            );
        } else if(this.props.location.pathname !== '/login') {
            return <Redirect to="/login"/>
        }
        else {
            return (
                <div id="Application">
                    {this.state.pageLoading && <Loading />}
                    { this.state.globalMessages.type && <GlobalMessage {...this.state.globalMessages} handleCloseToast={this._closeToast} /> }

                    <Login />
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    authenticate: state.authenticate,
    globalMessages: state.globalMessages,
    pageLoading: state.pageLoading
});

const actions = {
    requestAuthenticate: authenticateActions.requestAuthenticate,
    resetAllMessage: globalMessageActions.resetAllMessage
};

export default withRouter(
    connect(mapStateToProps, actions)(Application)
);
