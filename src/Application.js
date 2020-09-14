import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
            <div>
                <h1>Successful !!!</h1>
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
