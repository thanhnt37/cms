import React, {Component} from 'react';
import {connect} from "react-redux";

import { actions as pageLoadingActions } from "../../actions/pageLoading";
import {actions as articleActions} from "../../actions/articles";
import {actions as keywordActions} from "../../actions/keywords";

import ArticleAnalysis from './view';

const _ = require('lodash');

export class AnalyticsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: props.articles,
            keywords: props.keywords
        };
    }

    componentDidMount() {
        if(_.isEmpty(this.props.articles.Items)) {
            this.props.startPageLoading();
            this.props.requestGetAllKeywords({});
            this.props.requestGetAllArticles({});
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(!_.isEmpty(nextProps.keywords) && (nextProps.keywords !== prevState.keywords)) {
            nextProps.stopPageLoading();

            return {
                ...prevState,
                keywords: nextProps.keywords
            };
        }

        if(!_.isEmpty(nextProps.articles) && (nextProps.articles !== prevState.articles)) {
            nextProps.stopPageLoading();

            return {
                ...prevState,
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
    articles: state.articles.analytics,
    keywords: state.keywords.index
});

const actions = {
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading,
    requestGetAllArticles: articleActions.requestGetAllArticles,
    requestGetAllKeywords: keywordActions.requestGetAllKeywords,
};

export default connect(mapStateToProps, actions)(AnalyticsContainer);
