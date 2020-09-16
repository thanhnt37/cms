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
    DialogContentText,
    DialogTitle,
    Stepper,
    Step,
    StepLabel
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './styles.scss';

import { actions as authenticateActions } from '../../actions/authenticate';
import { actions as pageLoadingActions } from "../../actions/pageLoading";

export class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modelActiveStep: 0
        }
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

    _showModal = (e) => {
        e.preventDefault();
        this.setState({
            modalVisible: true
        });
    };

    _hideModal = (e) => {
        e.preventDefault();
        this.setState({
            modalVisible: false
        });
    };

    _nextStep = () => {
        this.setState({
            modelActiveStep: this.state.modelActiveStep + 1
        });
    };

    render() {
        return (
            <LoginComponent
                handleLoginSubmit = {this._handleLoginSubmit}
                modalVisible = {this.state.modalVisible}
                showModal = {this._showModal}
                hideModal = {this._hideModal}
                modelActiveStep = {this.state.modelActiveStep}
                nextStep = {this._nextStep}
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
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <a href="#" className="show-modal" onClick={props.showModal} >Forgotten password?</a>
                    </Grid>
                </Grid>
            </form>

            <Dialog open={props.modalVisible} onClose={props.hideModal} aria-labelledby="form-dialog-title" id="modal-forgot-password">
                <DialogTitle id="modal-title">Forgot Password</DialogTitle>

                <DialogContent id="modal-content">
                    <Stepper activeStep={props.modelActiveStep} alternativeLabel>
                        <Step key="request"> <StepLabel>Request</StepLabel> </Step>
                        <Step key="verification"> <StepLabel>Verification</StepLabel> </Step>
                        <Step key="complete"> <StepLabel>Complete!</StepLabel> </Step>
                    </Stepper>

                    <div style={{margin: "20px 0 25px"}}>
                        {getModalContent(props)}
                    </div>
                </DialogContent>

                <DialogActions id="modal-actions">
                    <Button onClick={props.hideModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.nextStep} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

const getModalContent = (props) => {
    if(props.modelActiveStep === 2) {
        return <ThirdStep {...props} />
    } else if(props.modelActiveStep === 1) {
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
                name="name"
                type="email"
                label="Email Address"
                fullWidth={true}
                helperText="Enter your email address then check the email for confirmation code."
            />
        </section>
    );
}

const SecondStep = () => {
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
                name="code"
                type="text"
                label="Confirmation Code"
                fullWidth={true}
                margin="dense"
            />

            <TextField
                required={true}
                name="password"
                type="text"
                label="New Password"
                fullWidth={true}
                margin="dense"
            />

            <TextField
                required={true}
                name="re_password"
                type="text"
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

const ThirdStep = () => {
    return (
        <section className="third-step">
            <CheckCircleOutlineIcon style={{ color: "green" }} />
            <h2>Completed!</h2>
            <p className="note">The password has been changed. <br/> Please login again!</p>
        </section>
    );
};
