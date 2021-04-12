import React from 'react';
import {
    Container,
    Grid,
    Paper,
    Breadcrumbs,
    TextField,
    Typography,
    Button,
    Divider,
} from '@material-ui/core';
import { Link } from "react-router-dom";

import './styles.scss';

const CreateKeyword = (props) => {
    return (
        <Container id='create-keyword'>
            <Paper elevation={0} className="index-page__breadcrumb">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Dashboard
                    </Link>
                    <Link color="inherit" to="/keywords">
                        Keywords
                    </Link>
                    <Typography color="textPrimary">Create New</Typography>
                </Breadcrumbs>
            </Paper>

            <Paper elevation={0} className="content">
                <h1 className="title">Create New Keyword</h1>
                <Divider />

                <form onSubmit={props.submit} autoComplete="off">
                    <Grid container justify='center' alignItems='center'>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                label="Keyword"
                                name='text'
                                fullWidth={true}
                                value={props.keyword.text}
                                onChange={props.changeKeyword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                label="Volume"
                                name='volume'
                                fullWidth={true}
                                value={props.keyword.volume}
                                onChange={props.changeKeyword}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} justify="center" style={{marginTop: '20px'}}>
                        <Grid item>
                            <Button variant="outlined">
                                <Link color="inherit" to="/keywords">
                                    Cancel
                                </Link>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button type='submit' variant="outlined" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateKeyword;
