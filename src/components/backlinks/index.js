import React, {Component} from 'react';
import {connect} from "react-redux";

import Backlinks from './view';
import {actions as articleActions} from "../../actions/articles";
import { actions as pageLoadingActions } from "../../actions/pageLoading";
import {actions as globalMessageActions} from "../../actions/globalMessages";

const _ = require('lodash');

export class BacklinksComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: props.articles,
            keyword: '',
            opportunities: []
        };
    }

    componentDidMount() {
        if(_.isEmpty(this.props.articles.Items)) {
            this.props.startPageLoading();
            this.props.requestGetAllArticles({});
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(!_.isEmpty(nextProps.articles) && (nextProps.articles !== prevState.articles)) {
            nextProps.stopPageLoading();

            return {
                ...prevState,
                articles: nextProps.articles
            };
        }

        return prevState;
    }

    _changeKeyword = async (e) => {
        if(e.target.name === 'keyword') {
            this.setState({
                ...this.state,
                keyword: e.target.value
            });
        }
    }

    _submit = async (e) => {
        e.preventDefault();
        this.props.startPageLoading();

        let keyword = this.state.keyword.trim();
        if(keyword.length <= 5) {
            this.props.stopPageLoading();
            this.props.newWarningMessage("Warning, The keyword length is too short !");
            return true;
        }

        let opportunities = [];
        let totalSentences = 0;
        for (let i = 0; i < this.state.articles.Items.length; i++) {
            let article = this.state.articles.Items[i];
            if(article.is_enabled !== 'true') {
                continue;
            }

            let sentences = [];
            let content = document.createElement('div');
            content.innerHTML = article.content;

            let allPTags = content.getElementsByTagName('p');
            for(let j = 0; j < allPTags.length; j++) {
                let currentP = allPTags[j];
                currentP = currentP.innerText.split('.');

                for(let k = 0; k < currentP.length; k++) {
                    let tmpSentence = currentP[k];
                    if(tmpSentence.toLowerCase().indexOf(keyword) !== -1) {
                        sentences.push(tmpSentence.toLowerCase().replace(keyword, `<strong>${keyword}</strong>`))
                    }
                }
            }

            if(sentences.length) {
                totalSentences += sentences.length;

                opportunities.push(
                    {
                        title: article.title,
                        slug: article.slug,
                        sentences: sentences
                    }
                );
            }
        }

        this.setState({
            ...this.state,
            opportunities: opportunities
        });
        this.props.stopPageLoading();
        if(opportunities.length === 0) {
            this.props.newInfoMessage(`There's 0 suggestion for "${keyword}" !`);
        } else {
            this.props.newSuccessMessage(`There're ${totalSentences} suggestions for "${keyword}" !`);
        }
    };

    render() {
        return (
            <Backlinks
                {...this.state}
                changeKeyword={this._changeKeyword}
                submit={this._submit}
            />
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articles.analytics,
});

const actions = {
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading,
    requestGetAllArticles: articleActions.requestGetAllArticles,
    newWarningMessage: globalMessageActions.newWarningMessage,
    newSuccessMessage: globalMessageActions.newSuccessMessage,
    newInfoMessage: globalMessageActions.newInfoMessage,
};

export default connect(mapStateToProps, actions)(BacklinksComponent);
