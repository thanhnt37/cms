import React, {Component} from 'react';
import {connect} from "react-redux";

import './styles.scss';
import Header from "./header";
import LeftAside from "./left_aside";

export class LayoutContainer extends Component {

    render() {
        return (
            <div id="Application">
                <Header />
                <LeftAside />

                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state
});

const actions = {};

export default connect(mapStateToProps, actions)(LayoutContainer);
