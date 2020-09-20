import React, {Component} from 'react';
import {connect} from "react-redux";
import ArticleCreate from './view';
import {actions as articleActions} from "../../../actions/articles";
import {actions as pageLoadingActions} from "../../../actions/pageLoading";

const _ = require('lodash');
const slugify = require('slugify');
slugify.extend({'đ': 'd', 'Đ': 'd', });

export class CreateArticleComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: {
                slug: props.match.params.slug,
                title: '',
                description: "null",
                content: "No Content",
                poster: "http://placehold.it/720x405",
                thumbnail: "http://placehold.it/320x180",
                tags: [],
                is_enabled: "false",
                published_at: "null",
                viewed: 0,
                voted: 0,
                related_articles: "null"
            }
        };
    }

    componentDidMount = async () => {
        this.props.stopPageLoading();
    }

    _changeTitle = async (e) => {
        let article = this.state.article;
        article[e.target.name] = e.target.value;

        this.setState({
            ...this.state,
            article: article
        });
    }

    _submitNewArticle = async (e) => {
        e.preventDefault();
        this.props.startPageLoading();

        let slug = _.toLower(slugify(e.target.title.value, {remove: /[!@#$%^&*();:'"~`?.,<>//]/g}));
        let article = {
            ...this.state.article,
            // TODO: check nếu là tạo mới thì mới generate new slug, cần check xem slug mới đã tồn tại trên dynamodb chưa ?
            slug: slug,
            tags: "{}"
        };

        this.props.requestCreateNewArticle(article);
        return this.props.history.push("/articles");
    }

    render() {
        return (
            <ArticleCreate
                {...this.state}
                changeTitle={this._changeTitle}
                submitNewArticle={this._submitNewArticle}
            />
        );
    }
}

const mapStateToProps = state => ({
});

const actions = {
    requestCreateNewArticle: articleActions.requestCreateNewArticle,
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading
};

export default connect(mapStateToProps, actions)(CreateArticleComponent);
