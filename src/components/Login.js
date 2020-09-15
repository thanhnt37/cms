import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    Container,
    Grid,
    TextField,
    Button,
} from '@material-ui/core';
import './login/styles.scss';

import { actions as authenticateActions } from '../actions/authenticate';
import { actions as pageLoadingActions } from "../actions/pageLoading";

export class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.stopPageLoading();
    }

    _handleLoginSubmit = (e) => {
        this.props.startPageLoading();
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        this.props.requestLogin(email, password);
    };

    render() {
        return (
            <LoginComponent
                handleLoginSubmit = {this._handleLoginSubmit}
            />
        );
    }
}

const mapStateToProps = state => ({});

const actions = {
    requestLogin: authenticateActions.requestLogin,
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading
};

export default connect(mapStateToProps, actions)(LoginContainer);

const LoginComponent = (props) => {
    return (
        <Container id="login-page">
            <img src="/admin_avatar.jpg" alt=""/>

            <form onSubmit={props.handleLoginSubmit} autoComplete="off">
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Email"
                            name='email'
                            fullWidth={true}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Password"
                            name='password'
                            type="password"
                            fullWidth={true}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <Button type='submit' variant="outlined" color="primary">
                            Signin
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
