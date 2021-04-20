import React, {Component} from 'react';
import {connect} from "react-redux";

import Keywords from './view';
import {actions as keywordActions} from "../../actions/keywords";
import { actions as pageLoadingActions } from "../../actions/pageLoading";
import {actions as articleActions} from "../../actions/articles";

const _ = require('lodash');

export class KeywordsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keywords: props.keywords,
            articles: props.articles,
            authenticate: props.authenticate
        };
    }

    componentDidMount() {
        if(_.isEmpty(this.props.keywords.Items)) {
            this.props.startPageLoading();
            this.props.requestGetAllKeywords({});
        }

        if(_.isEmpty(this.props.articles.Items)) {
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
            <Keywords
                {...this.state}
                currentUserEmail={this.props.authenticate.authUser.attributes.email}
            />
        );
    }
}

const mapStateToProps = state => ({
    authenticate: state.authenticate,
    keywords: state.keywords.index,
    articles: state.articles.analytics
});

const actions = {
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading,
    requestGetAllKeywords: keywordActions.requestGetAllKeywords,
    requestGetAllArticles: articleActions.requestGetAllArticles,
};

export default connect(mapStateToProps, actions)(KeywordsComponent);
