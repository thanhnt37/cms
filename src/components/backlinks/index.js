import React, {Component} from 'react';
import {connect} from "react-redux";

import Backlinks from './view';
import {actions as articleActions} from "../../actions/articles";
import { actions as pageLoadingActions } from "../../actions/pageLoading";

const _ = require('lodash');

export class BacklinksComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: props.articles,
            keyword: '',
            opportunities: [
                {
                    title: 'Các món chay thơm ngon dễ làm từ hạt điều',
                    slug: 'cac-mon-chay-thom-ngon-de-lam-tu-hat-dieu',
                    sentences: [
                        'Nhiều người <strong>thích ăn chay</strong> bởi vì các món chay ngon hấp dẫn trong từng vị thanh tươi của thực phẩm chay',
                        'Hạt điều vốn là loại hạt dinh dưỡng, được các chuyên gia khuyến khích sử dụng hợp lí để đem đến hiệu quả sức khỏe cao',
                        'Xứng danh cái tên hạt dinh dưỡng, hạt điều là nguồn cung cấp các loại khoáng chất, vitamin thiết yếu cho cơ thể',
                        'Anh chị biết không, sữa hạt điều chính là lựa chọn lý tưởng để gấp đôi dinh dưỡng cho cơ thể. Với một ly sữa hạt điều nguyên chất hay kết hợp với nhiều loại rau củ sẽ giúp các anh chị gấp đôi dưỡng chất được hấp thụ'
                    ]
                }
            ]
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
        if(keyword.length === 0) {
            this.props.stopPageLoading();
            return true;
        }

        console.log("keyword: ", keyword, keyword.length);
        // for (let i = 0; i < articles.length; i++) {
        //     let article = articles[i];
        //     if(article.is_enabled !== 'true' || i >= 1) {
        //         continue;
        //     }
        //
        //     let sentences = [];
        //     let content = document.createElement('div');
        //     content.innerHTML = this.state.article.content;
        //
        //     let allPTags = content.getElementsByTagName('p');
        //     for(let j = 0; j < allPTags.length; j++) {
        //         let currentP = allPTags[i];
        //     }
        // }
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
};

export default connect(mapStateToProps, actions)(BacklinksComponent);
