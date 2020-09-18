import React from 'react';
import { Link } from "react-router-dom";
import {Container, Paper, Breadcrumbs, TextField, Typography, Fab} from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import './styles.scss';

const Articles = (props) => {
    const rows = props.articles.Items || [];
    const columns = [
        { id: 'title', label: 'Title' },
        { id: 'updated_at', label: 'Updated At', width: 175 },
        {
            id: 'is_enabled',
            label: 'is Enabled',
            width: 100,
            align: 'right',
        }
    ];

    return (
        <Container id='articles'>
            <Paper elevation={0} className='articles__breadcrumb'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Dashboard
                    </Link>
                    <Typography color="textPrimary">Articles</Typography>
                </Breadcrumbs>
            </Paper>

            <Paper elevation={0} className="articles__content">
                <div className='articles__search-wrapper'>
                    <TextField
                        name="keyword"
                        className='articles__search-input'
                        label="Tìm kiếm bài viết"
                        placeholder="Nhập tiêu đề hoặc slug"
                        margin="dense"
                        variant="outlined"
                        fullWidth={true}
                    />

                    <Fab
                        className='articles__btn--create-new'
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        component="a"
                        href="/articles/create"
                    >
                        <AddIcon/>
                        Create New
                    </Fab>
                </div>

                <Paper elevation={0} className="articles__table--wrapper">
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
                            {rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.slug} slug={row.slug}>
                                        {
                                            columns.map(column => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {
                                                            column.id === 'title' ?
                                                                <Link to={`/articles/${row.slug}`}>{value}</Link> :
                                                                column.id === 'is_enabled' ?
                                                                    <span style={{color: (value === 'true') ? "#4caf50" : "black"}}>{value}</span> :
                                                                    value
                                                        }
                                                    </TableCell>
                                                );
                                            })
                                        }
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[10, 20, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={props.rowsPerPage}
                        page={props.page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={props.changePage}
                        onChangeRowsPerPage={props.changeRowsPerPage}
                    />
                </Paper>
            </Paper>
        </Container>
    );
};

export default Articles;
