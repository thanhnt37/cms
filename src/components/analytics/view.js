import React from 'react';
import {Link} from "react-router-dom";
import {Breadcrumbs, Container, Paper, Typography} from '@material-ui/core';
import './styles.scss';

const _ = require('lodash');

const ArticleAnalysis = (props) => {

    let keywords = props.keywords.Items;
    let globalTags = {};
    for(let i = 0; i < keywords.length; i++) {
        let keyword = keywords[i];
        globalTags[keyword.slug] = keyword;
    }

    let articles = props.articles;
    articles.Items = _.orderBy(articles.Items, ['is_enabled', 'updated_at'], ['asc', 'desc']);

    let data = {};

    for(let i = 0; i < articles.Items.length; i++) {
        let article = articles.Items[i];

        // keyword analytic
        let tags = JSON.parse(article.tags);
        let tagKeys = Object.keys(tags);
        let subTags = [];
        let mainTag = {
            slug: tagKeys[0],
            text: tags[tagKeys[0]],
            volume: _.get(globalTags, `${tagKeys[0]}.volume`, 'unknown')
        };
        delete tags[Object.keys(tags)[0]];
        for(let slug in tags) {
            subTags.push(
                {
                    slug: slug,
                    text: tags[slug],
                    volume: _.get(globalTags, `${slug}.volume`, 'unknown')
                }
            );
        }

        let linksOut = JSON.parse(article.links_out || '[]');
        for(let j = 0; j < linksOut.length; j++) {
            let link = linksOut[j];
            if(_.startsWith(link.url, '/blog/')) {
                let target = link.url.split("/")[2];
                let linkIn = {
                    text: link.text,
                    url: `/articles/${article.slug}` // nhằm chỉ ra backlink này đến từ đâu?
                };
                if(_.has(data, target)) {
                    if(_.has(data, `${target}.links_in`)) {
                        data[target].links_in.push(linkIn);
                    } else {
                        data[target].links_in = [linkIn];
                    }
                } else {
                    data[target] = {
                        slug: `${article.slug}`,
                        title: `a bug from ${article.title}`,
                        word_count: 'not_counted',
                        keywords: {
                            main: {},
                            sub: []
                        },
                        links_out: [],
                        links_in: [linkIn]
                    }
                }

                linksOut[j].url = `/articles/${target}`;
            }
        }


        data[article.slug] = {
            ...data[article.slug],

            slug: article.slug,
            title: article.title,
            word_count: article.words_count || 'not_counted',
            keywords: {
                main: mainTag,
                sub: subTags
            },
            links_out: linksOut,
        };
    }
    data = Object.values(data);

    const _renderSubKeyword = (subKeywords = []) => {
        let html = [];
        for (let i = 0; i < subKeywords.length; i++) {
            let keyword = subKeywords[i];

            html.push(
                <span className="keyword">
                    {keyword.text}
                    <span className="volume">
                        {keyword.volume}
                    </span>
                </span>
            );
        }
        return html;
    }
    const _renderLinks = (links = []) => {
        let html = [];
        for (let i = 0; i < links.length; i++) {
            let link = links[i];

            html.push(
                <li>
                    <a href={link.url} title={link.url} className="link" target="_blank" rel="noopener noreferrer">{link.text}</a>
                </li>
            );
        }
        return (
            <ul>
                {html}
            </ul>
        );
    }
    const _renderRecords = () => {
        let html = [];
        for (let i = 0; i < data.length; i++) {
            let article = data[i];

            html.push(
                <tr>
                    <td className="number-order">{i + 1}</td>
                    <td className="title">
                        <a href={`/articles/${article.slug}`} target="_blank" title={article.slug}>{article.title}</a>
                    </td>
                    <td className="word-count">
                        <span>{article.word_count}</span>
                    </td>
                    <td className="keywords">
                        <p className="main">
                            {article.keywords.main.text}
                            <span className="volume">{article.keywords.main.volume}</span>
                        </p>
                        <p className="sub">
                            { _renderSubKeyword(article.keywords.sub) }
                        </p>
                    </td>
                    <td className="links_in">
                        { _renderLinks(article.links_in) }
                    </td>
                    <td className="links_out">
                        { _renderLinks(article.links_out) }
                    </td>
                </tr>
            );
        }

        return html;
    }

    return (
        <Container id='article-analysis'>
            <Paper elevation={0} className='index-page__breadcrumb'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Dashboard
                    </Link>
                    <Typography color="textPrimary">Analytics</Typography>
                </Breadcrumbs>
            </Paper>

            <h1>Article Analysis</h1>

            <Paper elevation={0} className="content">
                <table>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Word Count</th>
                        <th>Keywords</th>
                        <th>Links In</th>
                        <th>Links Out</th>
                    </tr>

                    { _renderRecords() }
                </table>
            </Paper>
        </Container>
    );
};

export default ArticleAnalysis;