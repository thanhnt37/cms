import React from 'react';
import {Link} from "react-router-dom";
import {Breadcrumbs, Container, Paper, Typography} from '@material-ui/core';
import './styles.scss';

const ArticleAnalysis = (props) => {

    let articles = props.articles;
    let data = [];
    for(let i = 0; i < articles.Items.length; i++) {
        // if(i >= 1) {
        //     break;
        // }

        let article = articles.Items[i];

        // keyword analytic
        let tags = JSON.parse(article.tags);
        let tagKeys = Object.keys(tags);
        let subTags = [];
        let mainTag = {
            slug: tagKeys[0],
            text: tags[tagKeys[0]],
            volume: '1k - 10k'
        };
        delete tags[Object.keys(tags)[0]];
        for(let slug in tags) {
            subTags.push(
                {
                    slug: slug,
                    text: tags[slug],
                    volume: '1k - 10k'
                }
            );
        }

        // content analytics
        // console.log(article.content);
        // let content = document.createElement('div');
        // content.innerHTML = article.content;
        // let p = content.getElementsByTagName('p');
        // console.log(p[0]);


        data.push(
            {
                slug: article.slug,
                title: article.title,
                word_count: 789,
                keywords: {
                    main: mainTag,
                    sub: subTags
                },
                links_in: [
                    {
                        text: 'cách làm hạt điều rang',
                        url: '/blog/hat-dieu-rang-muoi-mon-an-vat-dinh-duong-quoc-dan'
                    },
                    {
                        text: 'hạt điều rang',
                        url: '/blog/hat-dieu-rang-muoi-mon-an-vat-dinh-duong-quoc-dan'
                    },
                ],
                links_out: [
                    {
                        text: 'sữa hạt điều',
                        url: '/blog/sua-hat-dieu-cong-thuc-cho-mot-ly-sua-chat-luong-la-gi'
                    },
                    {
                        text: 'sữa điều tươi',
                        url: '/blog/sua-hat-dieu-cong-thuc-cho-mot-ly-sua-chat-luong-la-gi'
                    },
                    {
                        text: 'sữa hạt điều',
                        url: '/blog/sua-hat-dieu-cong-thuc-cho-mot-ly-sua-chat-luong-la-gi'
                    },
                    {
                        text: 'sữa điều tươi',
                        url: '/blog/sua-hat-dieu-cong-thuc-cho-mot-ly-sua-chat-luong-la-gi'
                    },
                ]
            }
        );
    }

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
                    <a href={link.url} title={link.url} className="link" target="_blank">{link.text}</a>
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
                    <td className="title">
                        <a href={`/articles/${article.slug}`} target="_blank" title={article.title}>{article.title}</a>
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
