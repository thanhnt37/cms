import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

import ArticlesDetail from './view';
import {actions as s3Actions} from "../../../actions/s3";
import {actions as articleActions} from "../../../actions/articles";
import {actions as pageLoadingActions} from "../../../actions/pageLoading";
import {actions as globalMessageActions} from "../../../actions/globalMessages";
import * as S3Services from '../../../services/s3';

// import "../../../node_modules/prismjs/themes/prism-okaidia.css"; // ---> code syntax highlight

const _ = require('lodash');
const slugify = require('slugify');
slugify.extend({'đ': 'd', 'Đ': 'd', });

const DEFAULT_CREATE_PATH = 'create';
const NGUYEN_TAT_THANH = 'tatthanh.dev@gmail.com';

export class ArticleComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allSlugs: props.allSlugs,
            article: {
                title: '',
                description: "null",
                content: "No Content",
                poster: "http://placehold.it/720x405",
                thumbnail: "http://placehold.it/320x180",
                is_enabled: "false",
                is_featured: "false",
                published_at: "null",
                viewed: 0,
                voted: 0,
                rendering_style: 1,
                related_articles: "null",
                ...props.article,
                tags: _.isArray(props.article.slug) ? Object.values(JSON.parse(props.article.tags)) : [],
                slug: props.match.params.slug,
            },
            previewModal: {
                isOpen: false
            },
            s3: props.s3,
            authenticate: props.authenticate,
        };
    }

    componentDidMount = async () => {
        // TODO: re-use api response
        let slug = this.state.article.slug;
        if(this.props.article.slug !== this.state.article.slug) {
            this.props.startPageLoading();
            this.props.requestFindArticle(slug);
        }

        // cannot re-use s3 policy
        this.props.requestS3Policy(slug);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.article === undefined) {
            nextProps.newErrorMessage("Error, article does not exist !!!");
            return prevState;
        }

        if(!_.isEmpty(nextProps.allSlugs) && _.isEmpty(prevState.allSlugs)) {
            return {
                ...prevState,
                allSlugs: nextProps.allSlugs
            };
        }

        if(!_.isEmpty(nextProps.article) && (nextProps.article.title !== prevState.article.title)) {
            if((nextProps.article.author !== nextProps.authenticate.authUser.attributes.email) && (nextProps.authenticate.authUser.attributes.email !== 'tatthanh.dev@gmail.com')) {
                // show message then redirect from view
                nextProps.newErrorMessage("Access Denied, you are not the author !!!");
            }

            let article = nextProps.article;
            let tags = JSON.parse(article.tags);
            article.tags = Object.values(tags);

            if(_.isEmpty(prevState.allSlugs)) {
                nextProps.requestAllArticleSlugs();
            }
            return {
                ...prevState,
                article: article
            };
        }

        if(_.has(nextProps, 's3.fields.Policy') && (!_.has(prevState, 's3.fields.Policy') || (nextProps.s3.fields.Policy !== prevState.s3.fields.Policy))) {
            nextProps.stopPageLoading();
            return {
                ...prevState,
                s3: nextProps.s3,
                imageUploadToS3: {
                    uploadURL: `https://s3.ap-southeast-1.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_NAME}`,
                    keyStart: prevState.article.slug + '-',
                    params: {
                        "acl": 'public-read',
                        "X-Amz-Credential": nextProps.s3.fields['X-Amz-Credential'],
                        "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
                        "X-Amz-Date": nextProps.s3.fields['X-Amz-Date'],
                        "Policy": nextProps.s3.fields['Policy'],
                        "X-Amz-Signature": nextProps.s3.fields['X-Amz-Signature'], // computed in backend
                    }
                }
            };
        }

        return prevState;
    }

    _changeTextField = async (e) => {
        let article = this.state.article;
        if(e.target.name === 'poster') {
            article['cover_image'] = URL.createObjectURL(e.target.files[0]);
            article['poster'] = e.target.files[0];
        } else if(e.target.name === 'is_enabled') {
            article['is_enabled'] = e.target.checked.toString();
        } else if(e.target.name === 'is_featured') {
            article['is_featured'] = e.target.checked.toString();
        } else if(e.target.name === 'tags') {
            let tmpTags = e.target.value;
            _.remove(tmpTags, function(i) {
                return (i === 'null') || (i === '');
            });
            article['tags'] = tmpTags.join(', ');
        } else if(e.target.name === 'related_articles') {
            let tmpRelatedArticles = e.target.value;
            _.remove(tmpRelatedArticles, function(i) {
                return (i === 'null') || (i === '');
            });
            article['related_articles'] = tmpRelatedArticles.join(', ');
        } else {
            article[e.target.name] = e.target.value;
        }

        this.setState({
            ...this.state,
            article: article
        });
    }

    _changeDateTime = (date, value) => {
        this.setState({
            ...this.state,
            article: {
                ...this.state.article,
                published_at: value
            }
        });
    }

    _changeTags = (tags) => {
        this.setState(
            {
                ...this.state,
                article: {
                    ...this.state.article,
                    tags: tags
                }
            }
        );
    }

    _changePreviewContent = (model) => {
        this.setState({
            ...this.state,
            article: {
                ...this.state.article,
                content: model
            }
        });
    };

    _openPreview = () => {
        this.setState({
            ...this.state,
            previewModal: {
                isOpen: true
            }
        });
    };

    _closePreview = () => {
        this.setState({
            ...this.state,
            previewModal: {
                isOpen: false
            }
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.startPageLoading();

        let content = document.createElement('div');
        content.innerHTML = this.state.article.content;

        // remove froala signature & add the article footer
        let p = content.getElementsByTagName('p');
        if(p.length > 1) {
            let lastPTag = p[p.length - 1];
            if(lastPTag.getAttribute('data-f-id') === "pbf") {
                lastPTag.remove();
            }
            lastPTag = p[p.length - 1];
            if(lastPTag.getAttribute('class') !== "signature") {
                let signature = document.createElement("div");
                signature.innerHTML = `<p class="signature" style="text-align: right; font-size: 14px;"><em>Thanks for your reading !<br>from <a href="//hatdieubactam.vn" title="Hạt Điều Bác Tâm">Hạt Điều Bác Tâm</a> with&nbsp;</em><span style="color: red;"><em>♥</em></span></p>`;
                content.appendChild(signature);
            }
        }

        // adding table of contents
        let tableOfContents = "<ol>";
        let h2Tags = content.getElementsByTagName('h2');
        for (let i = 0; i < h2Tags.length; i++) {
            let item = h2Tags[i];
            let slug = slugify(item.textContent.toLowerCase(), {remove: /[!@#$%^&*();:'"~`?.<>]/g});
            tableOfContents += "<li><a href='#" + slug + "'>" + item.textContent + "</a></li>";
            content.getElementsByTagName('h2')[i].setAttribute("id", slug);
        }
        tableOfContents += "</ol>";

        // validate anchor tags
        let aTags = content.getElementsByTagName('a');
        for (let i = 0; i < aTags.length; i++) {
            let item = aTags[i];
            content.getElementsByTagName('a')[i].setAttribute("title", item.innerHTML);

            if((item.href.indexOf('hatdieubactam.vn') === -1) && (item.href.indexOf('127.0.0.1') === -1) && (item.href.indexOf('localhost') === -1)) {
                content.getElementsByTagName('a')[i].setAttribute("rel", "noopener noreferrer nofollow");
                content.getElementsByTagName('a')[i].setAttribute("target", "_blank");
            }
        }

        // validate image tags
        let imgTags = content.getElementsByTagName('img');
        for (let i = 0; i < imgTags.length; i++) {
            let item = imgTags[i];
            let src = item.src;
            src = src.replace(`s3.ap-southeast-1.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_NAME}`, process.env.REACT_APP_AWS_S3_ASSET_DOMAIN);
            content.getElementsByTagName('img')[i].setAttribute("src", src);
            content.getElementsByTagName('img')[i].setAttribute("alt", this.state.article.title);
            content.getElementsByTagName('img')[i].setAttribute("title", this.state.article.title);
        }
        content = content.innerHTML;

        let slug = this.state.article.slug; // (this.state.article.slug === DEFAULT_CREATE_PATH) ? _.toLower(slugify(e.target.title.value, {remove: /[!@#$%^&*();:'"~`?.,<>//]/g})) : this.state.article.slug;
        let tags = this.state.article.tags;
        let tagsObject = {};
        tags.forEach(function (value, index) {
            value = value.toLowerCase().trim();
            tagsObject[slugify(value)] = value;
        });
        let article = {
            ...this.state.article,
            // TODO: check nếu là tạo mới thì mới generate new slug, cần check xem slug mới đã tồn tại trên dynamodb chưa ?
            // slug: slug,
            tags: JSON.stringify(tagsObject),
            content: content,
            table_of_contents: tableOfContents
        };

        if(typeof(article.poster) === 'object') {
            await S3Services.putObject(process.env.REACT_APP_AWS_S3_BUCKET_NAME, `${slug}.jpg`, this.state.article.poster);
            let posterUrl = `https://${process.env.REACT_APP_AWS_S3_ASSET_DOMAIN}/${slug}.jpg`;
            article.poster = posterUrl;
            article.thumbnail = posterUrl;
        }

        delete article.cover_image;
        this.props.requestUpdateArticle(article);
    }

    _publishArticle = async () => {
        if(this.props.authenticate.authUser.attributes.email === NGUYEN_TAT_THANH) {
            this.props.startPageLoading();
            this.props.requestPublishArticle(this.state.article.slug);
        } else {
            this.props.newErrorMessage("ERROR, _____ ACCESS DENIED _____");
        }
    }

    render() {
        if ((this.props.article === undefined) || (!_.isEmpty(this.props.article) && (this.props.authenticate.authUser.attributes.email !== 'tatthanh.dev@gmail.com') && (this.props.article.author !== this.props.authenticate.authUser.attributes.email))) {
            return <Redirect to="/articles"/>
        } else {
            return (
                <ArticlesDetail
                    {...this.state}
                    changeTextField={this._changeTextField}
                    changeDateTime={this._changeDateTime}
                    changeTags={this._changeTags}
                    changePreviewContent={this._changePreviewContent}
                    openPreview={this._openPreview} closePreview={this._closePreview}
                    handleSubmit={this.handleSubmit}
                    publishArticle={this._publishArticle}
                    showPublishButton={this.props.authenticate.authUser.attributes.email === NGUYEN_TAT_THANH}
                    DEFAULT_CREATE_PATH={DEFAULT_CREATE_PATH}
                />
            );
        }
    }
}

const mapStateToProps = state => ({
    s3: state.s3,
    article: state.articles.detail,
    allSlugs: state.articles.allSlugs,
    authenticate: state.authenticate
});

const actions = {
    requestS3Policy: s3Actions.requestS3Policy,
    requestCreateNewArticle: articleActions.requestCreateNewArticle,
    requestUpdateArticle: articleActions.requestUpdateArticle,
    requestFindArticle: articleActions.requestFindArticle,
    requestAllArticleSlugs: articleActions.requestAllArticleSlugs,
    requestPublishArticle: articleActions.requestPublishArticle,
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading,
    newErrorMessage: globalMessageActions.newErrorMessage
};

export default connect(mapStateToProps, actions)(ArticleComponent);
