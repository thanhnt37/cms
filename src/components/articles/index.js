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
            pageSize: 10,
            currentPage: props.articles.currentPage,
            articles: props.articles
        };
    }

    componentDidMount() {
        if(_.isEmpty(this.props.articles.Items)) {
            this.props.startPageLoading();
            this.props.requestGetListArticles();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(!_.isEmpty(nextProps.articles) && (nextProps.articles !== prevState.articles)) {
            nextProps.stopPageLoading();

            return {
                ...prevState,
                currentPage: nextProps.articles.currentPage,
                articles: nextProps.articles
            };
        }

        return prevState;
    }

    _changePage = (event, newPage) => {
        let pageLimit = parseInt(this.state.articles.Count / this.state.pageSize);
        console.log(!_.isEmpty(this.state.articles.LastEvaluatedKey), newPage, pageLimit)
        if(!_.isEmpty(this.state.articles.LastEvaluatedKey) && ((newPage + 1) >= pageLimit)) {
            this.props.requestGetListArticles(this.state.articles.LastEvaluatedKey);
        }

        this.props.requestChangePage(newPage);
    };

    _changeRowsPerPage = event => {
        this.setState({
            ...this.state,
            pageSize: event.target.value,
            currentPage: 0
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
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading,
    requestGetListArticles: articleActions.requestGetListArticles,
    requestChangePage: articleActions.requestChangePage,
};

export default connect(mapStateToProps, actions)(ArticlesComponent);
