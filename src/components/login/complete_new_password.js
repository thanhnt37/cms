import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Grid, TextField} from "@material-ui/core";

import './styles.scss';
import { actions as authenticateActions } from '../../actions/authenticate';
import { actions as globalMessageActions } from '../../actions/globalMessages';
import { actions as pageLoadingActions } from '../../actions/pageLoading';

class CompleteNewPasswordContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.stopPageLoading();
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.startPageLoading();
        let password = e.target.password.value;
        let re_password = e.target.re_password.value;

        if(password === re_password) {
            this.props.requestCompleteNewPassword(this.props.authenticate.authUser, password, {});
        } else {
            this.props.newErrorMessage("Error, password does not match with confirmation !");
            this.props.stopPageLoading();
        }
    };

    render() {
        return (
            <div id="complete-new-password">
                <h1>Change Password</h1>
                <p>You have to set a new password to finish the signin processing!</p>

                <form onSubmit={this._handleSubmit} autoComplete="off">
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="New Password"
                                name='password'
                                type="password"
                                fullWidth={true}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Confirmation"
                                name='re_password'
                                type="password"
                                fullWidth={true}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12}>
                            <Button type='submit' variant="outlined" color="primary">
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticate: state.authenticate
});

const actions = {
    requestCompleteNewPassword: authenticateActions.requestCompleteNewPassword,
    newErrorMessage: globalMessageActions.newErrorMessage,
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading,
};

export default connect(mapStateToProps, actions)(CompleteNewPasswordContainer);
