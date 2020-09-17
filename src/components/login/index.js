import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    Container,
    Grid,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stepper,
    Step,
    StepLabel
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './styles.scss';

import { actions as authenticateActions } from '../../actions/authenticate';
import { actions as pageLoadingActions } from "../../actions/pageLoading";
import { actions as globalMessageActions } from "../../actions/globalMessages";

export class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: {
                visible: false,
                activeStep: 0,
                email: null,
                textButton: "Send Request"
            }
        }
    }

    componentDidMount() {
        this.props.stopPageLoading();
    }

    static getDerivedStateFromProps(props, state) {
        if(props.forgotPasswordStep) {
            props.stopPageLoading();

            return {
                ...state,
                modal: {
                    ...state.modal,
                    activeStep: props.forgotPasswordStep,
                    textButton: props.forgotPasswordStep === 1 ? 'Change Password' : 'Done!'
                }
            };
        }

        return state;
    }

    _loginSubmit = (e) => {
        this.props.startPageLoading();
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        this.props.requestLogin(email, password);
    };

    _showModal = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            modal: {
                ...this.state.modal,
                visible: true
            }
        });
    };

    _hideModal = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            modal: {
                ...this.state.modal,
                visible: false
            }
        });
    };

    _modalSubmit = (e) => {
        this.props.startPageLoading();
        e.preventDefault();

        if(this.state.modal.activeStep === 0) {
            let email = e.target.email.value;

            this.setState({
                ...this.state,
                modal: {
                    ...this.state.modal,
                    email: email,
                }
            });
            this.props.requestForgotPassword(email);
        } else if(this.state.modal.activeStep === 1) {
            let code = e.target.code.value;
            let password = e.target.password.value;
            let re_password = e.target.re_password.value;

            if(password === re_password) {
                this.props.requestForgotPasswordSubmit(this.state.modal.email, code, password);
            } else {
                this.props.stopPageLoading();
                this.props.newErrorMessage("Error, password does not match with confirmation !");
            }
        } else {
            this.setState({
                ...this.state,
                modal: {
                    ...this.state.modal,
                    visible: false,
                    activeStep: 2,
                    textButton: "Done !"
                }
            });
        }
    };

    render() {
        return (
            <LoginComponent
                loginSubmit = {this._loginSubmit}

                // modal forgot password
                modal = {this.state.modal}
                showModal = {this._showModal}
                hideModal = {this._hideModal}
                modalSubmit = {this._modalSubmit}
            />
        );
    }
}

const mapStateToProps = state => ({
    forgotPasswordStep: state.authenticate.forgotPasswordStep
});

const actions = {
    requestLogin: authenticateActions.requestLogin,
    requestForgotPassword: authenticateActions.requestForgotPassword,
    requestForgotPasswordSubmit: authenticateActions.requestForgotPasswordSubmit,
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading,
    newErrorMessage: globalMessageActions.newErrorMessage
};

export default connect(mapStateToProps, actions)(LoginContainer);

const LoginComponent = (props) => {
    return (
        <Container id="login-page">
            <img src="/admin_avatar.jpg" alt=""/>

            <form onSubmit={props.loginSubmit} autoComplete="off">
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
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <a href="#" className="show-modal" onClick={props.showModal} >Forgotten password?</a>
                    </Grid>
                </Grid>
            </form>

            <Dialog open={props.modal.visible} onClose={props.hideModal} aria-labelledby="form-dialog-title" id="modal-forgot-password">
                <form onSubmit={props.modalSubmit} autoComplete="off">
                    <DialogTitle id="modal-title">Forgot Password</DialogTitle>

                    <DialogContent id="modal-content">
                        <Stepper activeStep={props.modal.activeStep} alternativeLabel>
                            <Step key="request"> <StepLabel>Request</StepLabel> </Step>
                            <Step key="verification"> <StepLabel>Verification</StepLabel> </Step>
                            <Step key="complete"> <StepLabel>Complete!</StepLabel> </Step>
                        </Stepper>

                        <div style={{margin: "20px 0 25px"}}>
                            {getModalContent(props)}
                        </div>
                    </DialogContent>

                    <DialogActions id="modal-actions">
                        <Button onClick={props.hideModal} variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="contained">
                            {props.modal.textButton}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
}

const getModalContent = (props) => {
    if(props.modal.activeStep === 2) {
        return <ThirdStep {...props} />
    } else if(props.modal.activeStep === 1) {
        return <SecondStep {...props} />
    } else {
        return <FirstStep {...props} />
    }
}

const FirstStep = () => {
    return (
        <section className="first-step">
            <TextField
                autoFocus
                required={true}
                name="email"
                type="email"
                label="Email Address"
                fullWidth={true}
                helperText="Enter your email address then check the email for confirmation code."
            />
        </section>
    );
}

const SecondStep = (props) => {
    return (
        <section className="second-step">
            <div className="tutorial">
                <h2>Sent Email!</h2>
                <p>
                    Check your email for confirmation. <br/>
                    Then enter the PIN code and new password.
                </p>
            </div>

            <TextField
                required={true}
                type="text"
                label="Email"
                disabled
                defaultValue={props.modal.email}
                fullWidth={true}
                margin="dense"
            />

            <TextField
                required={true}
                name="code"
                type="text"
                label="Confirmation Code"
                fullWidth={true}
                margin="dense"
            />

            <TextField
                required={true}
                name="password"
                type="password"
                label="New Password"
                fullWidth={true}
                margin="dense"
            />

            <TextField
                required={true}
                name="re_password"
                type="password"
                label="Confirm Password"
                fullWidth={true}
                margin="dense"
            />

            <p className="notes">
                <strong>If you do not receive the email:</strong> <br/>
                Please check whether it is in the trash can or junk folder.
            </p>
        </section>
    );
}

const ThirdStep = (props) => {
    return (
        <section className="third-step">
            <CheckCircleOutlineIcon style={{ color: "green" }} />
            <h2>Completed!</h2>
            <h4>Email: {props.modal.email}</h4>
            <p className="note">The password has been changed. <br/> Please login again!</p>
        </section>
    );
};
