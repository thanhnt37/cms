import React, {Component} from 'react';
import {connect} from "react-redux";

import { actions as pageLoadingActions } from "../actions/pageLoading";

export class DashboardContainer extends Component {

    componentDidMount() {
        this.props.stopPageLoading();
    }
    render() {
        return (
            <div id="Dashboard-Page">
                <h1>Message from DashboardComponent</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state
});

const actions = {
    stopPageLoading: pageLoadingActions.stopPageLoading
};

export default connect(mapStateToProps, actions)(DashboardContainer);
