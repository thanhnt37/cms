import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AppRoutes from "./components/Routes";

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

    render() {
        return (
            <div id="Application">
                <AppRoutes />
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const actions = {
};

export default withRouter(
    connect(mapStateToProps, actions)(Application)
);
