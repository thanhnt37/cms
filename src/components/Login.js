import React, {Component} from 'react';
import {connect} from "react-redux";

import { actions as authenticateActions } from '../actions/authenticate';
import { actions as globalMessageActions } from "../actions/globalMessages";

const LoginComponent = (props) => {
    return (
        <h1>login page</h1>
    );
}

export class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            modalVisible: false,
            modalConfirmLoading: false,
            forgotPasswordStep: 0,
            modalTextButton: 'Send Email!',
            email: null
        };
    }

    handleLoginSubmit = (e) => {
        this.setState({
            isLoading: true
        });

        e.preventDefault();
    };

    static getDerivedStateFromProps(props, state) {
        if(props.hideLoading === true) {
            return {
                isLoading: false
            };
        }
        if(props.forgotPasswordStep) {
            return {
                ...state,
                forgotPasswordStep: props.forgotPasswordStep,
                modalConfirmLoading: false,
                modalTextButton: props.forgotPasswordStep === 1 ? 'Change Password' : 'Completed!'
            };
        }
        return state;
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    handleModalOk = (e) => {
        e.preventDefault();
    };

    handleModalCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        return (
            <LoginComponent
                handleLoginSubmit = {this.handleLoginSubmit}
                isLoading = {this.state.isLoading}

                showModal={this.showModal}

                modalVisible={this.state.modalVisible}
                modalConfirmLoading={this.state.modalConfirmLoading}
                handleModalOk={this.handleModalOk}
                handleModalCancel={this.handleModalCancel}

                forgotPasswordStep = {this.state.forgotPasswordStep}
                modalTextButton = {this.state.modalTextButton}
            />
        );
    }
}

const mapStateToProps = state => ({
    hideLoading: state.authenticate.hideLoading,
    forgotPasswordStep: state.authenticate.forgotPasswordStep,
});

const actions = {
    requestLogin: authenticateActions.requestLogin,
    requestForgotPassword: authenticateActions.requestForgotPassword,
    requestForgotPasswordSubmit: authenticateActions.requestForgotPasswordSubmit,
    newErrorMessage: globalMessageActions.newErrorMessage
};

export default connect(mapStateToProps, actions)(LoginContainer);
