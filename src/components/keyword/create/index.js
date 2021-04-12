import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

import {actions as keywordActions} from "../../../actions/keywords";
import {actions as pageLoadingActions} from "../../../actions/pageLoading";
import CreateKeyword from './view';

const _ = require('lodash');
const slugify = require('slugify');
slugify.extend({'đ': 'd', 'Đ': 'd', });

export class CreateKeywordComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: {
                slug: '',
                text: '',
                volume: "unknown"
            }
        };
    }

    componentDidMount = async () => {
        this.props.stopPageLoading();
    }

    _changeKeyword = async (e) => {
        let keyword = this.state.keyword;
        keyword[e.target.name] = e.target.value;

        this.setState({
            ...this.state,
            keyword: keyword
        });
    }

    _submit = async (e) => {
        e.preventDefault();
        this.props.startPageLoading();

        let slug = _.toLower(slugify(e.target.text.value, {remove: /[!@#$%^&*();:'"~`?.,<>//]/g}));
        let keyword = {
            ...this.state.keyword,
            slug: slug
        };

        this.props.requestCreateNewKeyword(keyword);
        return this.props.history.push("/keywords");
    }

    render() {
        if(this.props.authenticate.authUser.attributes.email !== 'tatthanh.dev@gmail.com') {
            return <Redirect to="/keywords"/>
        } else {
            return (
                <CreateKeyword
                    {...this.state}
                    changeKeyword={this._changeKeyword}
                    submit={this._submit}
                />
            );
        }
    }
}

const mapStateToProps = state => ({
    authenticate: state.authenticate
});

const actions = {
    requestCreateNewKeyword: keywordActions.requestCreateNewKeyword,
    startPageLoading: pageLoadingActions.startPageLoading,
    stopPageLoading: pageLoadingActions.stopPageLoading
};

export default connect(mapStateToProps, actions)(CreateKeywordComponent);
