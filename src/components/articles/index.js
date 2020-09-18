import React, {Component} from 'react';
import {connect} from "react-redux";

import Articles from './view';
import {actions as articleActions} from "../../actions/articles";
import { actions as pageLoadingActions } from "../../actions/pageLoading";

const _ = require('lodash');

export class ArticlesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 20,
            articles: props.articles
        };
    }

    componentDidMount() {
        this.props.requestGetListArticles();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.stopPageLoading();
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if(!_.isEmpty(nextProps.articles) && (nextProps.articles !== prevState.articles)) {

            return {
                ...prevState,
                articles: nextProps.articles
            };
        }

        return prevState;
    }

    _changePage = (event, newPage) => {
        this.setState({
            ...this.state,
            page: newPage
        });
    };

    _changeRowsPerPage = event => {
        this.setState({
            ...this.state,
            rowsPerPage: event.target.value
        });
    };

    render() {
        return (
            <Articles
                {...this.state}
                changePage={this._changePage}
                changeRowsPerPage={this._changeRowsPerPage}
            />
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articles.index
});

const actions = {
    stopPageLoading: pageLoadingActions.stopPageLoading,
    requestGetListArticles: articleActions.requestGetListArticles
};

export default connect(mapStateToProps, actions)(ArticlesComponent);
