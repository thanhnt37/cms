import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

import { actions as authenticateActions } from '../actions/authenticate';

export class LogoutComponent extends Component {

    componentDidMount() {
        console.log('logout from: ', this.props.location.pathname);
        this.props.requestLogout();
    }

    render() {
        return <Redirect to="/"/>
    }
}

const mapStateToProps = state => ({});

const actions = {
    requestLogout: authenticateActions.requestLogout,
};

export default connect(mapStateToProps, actions)(LogoutComponent);
