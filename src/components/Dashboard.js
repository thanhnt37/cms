import React, {Component} from 'react';
import {connect} from "react-redux";

export class DashboardContainer extends Component {
    render() {
        return (
            <DashboardComponent />
        );
    }
}

const DashboardComponent = (props) => {
    return (
        <div id="Dashboard-Page">
            <h1>Message from DashboardComponent</h1>
        </div>
    );
};

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, {})(DashboardContainer);
