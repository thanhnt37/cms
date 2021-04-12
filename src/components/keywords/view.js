import React from 'react';
import { Link } from "react-router-dom";
import {Container, Paper, Breadcrumbs, Typography, Fab} from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import './styles.scss';

const _ = require('lodash');

const Keywords = (props) => {

    let rows = [];
    const columns = [
        { id: 'text_1', label: 'Keyword' },
        { id: 'volume_1', label: 'Volume', width: 175 },
        { id: 'text_2', label: 'Keyword' },
        { id: 'volume_2', label: 'Volume', width: 175 },
    ];
    let items = props.keywords.Items || [];
    items = _.orderBy(items, ['volume'], ['desc']);
    for(let i = 0; i < items.length; i++) {
        if(i%2) {
            continue;
        }
        rows.push(
            {
                text_1: items[i].text,
                volume_1: items[i].volume,
                text_2: _.get(items, `${i + 1}.text`, ''),
                volume_2: _.get(items, `${i + 1}.volume`, ''),
            }
        );
    }

    return (
        <Container id='keywords'>
            <Paper elevation={0} className='index-page__breadcrumb'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Dashboard
                    </Link>
                    <Typography color="textPrimary">Keywords</Typography>
                </Breadcrumbs>
            </Paper>

            <Paper elevation={0} className="content">
                <div className='search-wrapper'>
                    <h3 className="label">Total: {props.keywords.Items.length} keywords</h3>

                    {
                        (props.currentUserEmail === 'tatthanh.dev@gmail.com') &&
                        <Fab
                            className='create-new'
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            component="span"
                        >
                            <Link color="inherit" to="/keywords/create">
                                Create New
                            </Link>
                        </Fab>
                    }
                </div>

                <Paper elevation={0} className="table-wrapper">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ width: column.width }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.slug} slug={row.slug}>
                                        {
                                            columns.map(column => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        { value }
                                                    </TableCell>
                                                );
                                            })
                                        }
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Paper>
        </Container>
    );
};

export default Keywords;
