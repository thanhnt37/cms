import React from 'react';
import { Link } from "react-router-dom";
import {Container, Paper, Breadcrumbs, TextField, Typography} from '@material-ui/core';
import './styles.scss';

const Articles = (props) => {
    const opportunities = props.opportunities || [];

    const _renderSentences = (sentences = []) => {
        let html = [];
        for (let i = 0; i < sentences.length; i++) {
            let sentence = sentences[i];

            html.push(
                <li dangerouslySetInnerHTML={{__html: sentence}} />
            )
        }

        return (
            <ul>
                {html}
            </ul>
        );
    }

    const _renderRecords = () => {
        let html = [];
        for (let i = 0; i < opportunities.length; i++) {
            let article = opportunities[i];

            html.push(
                <tr>
                    <td>{i + 1}</td>
                    <td>
                        <a href={`/articles/${article.slug}`} target="_blank" rel="noopener noreferrer">{article.title}</a>
                    </td>
                    <td>
                        {_renderSentences(article.sentences)}
                    </td>
                </tr>
            )
        }

        return html;
    };

    return (
        <Container id='backlinks'>
            <Paper elevation={0} className='index-page__breadcrumb'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Dashboard
                    </Link>
                    <Typography color="textPrimary">Backlinks</Typography>
                </Breadcrumbs>
            </Paper>

            <Paper elevation={0} className="content">
                <div className='search-wrapper'>
                    <form onSubmit={props.submit}>
                        <TextField
                            className='input'
                            name="keyword"
                            label="Enter your keyword"
                            placeholder="ex: hạt điều rang muối"
                            margin="dense"
                            variant="outlined"
                            fullWidth={true}
                            value={props.keyword}
                            onChange={props.changeKeyword}
                        />
                    </form>
                </div>

                <Paper elevation={0} className="table-wrapper">
                    <h1>Backlink Opportunities</h1>

                    <table>
                        <thead>
                            <tr>
                                <th width="25px">No.</th>
                                <th width="175px">Article Title</th>
                                <th>The Sentences</th>
                            </tr>
                        </thead>
                        <tbody>
                            { _renderRecords() }
                        </tbody>
                    </table>
                </Paper>
            </Paper>
        </Container>
    );
};

export default Articles;
