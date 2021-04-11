import React, {Component} from 'react';
import {connect} from "react-redux";

import { actions as pageLoadingActions } from "../../actions/pageLoading";
import {actions as articleActions} from "../../actions/articles";

import ArticleAnalysis from './view';

const _ = require('lodash');

export class AnalyticsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // pageSize: 10,
            // currentPage: props.articles.currentPage,
            articles: props.articles,
            // authenticate: props.authenticate
        };
    }

    componentDidMount() {
        if(_.isEmpty(this.props.articles.Items)) {
            this.props.startPageLoading();
            this.props.requestGetListArticles({});
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(!_.isEmpty(nextProps.articles) && (nextProps.articles !== prevState.articles)) {
            nextProps.stopPageLoading();

            return {
                ...prevState,
                // currentPage: nextProps.articles.currentPage,
                articles: nextProps.articles
            };
        }

        return prevState;
    }

    render() {
        return (
            <ArticleAnalysis
                {...this.state}
            />
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articles.index,
});

const actions = {
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading,
    requestGetListArticles: articleActions.requestGetListArticles, // TODO: get all articles
};

export default connect(mapStateToProps, actions)(AnalyticsContainer);
