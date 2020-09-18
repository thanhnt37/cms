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

const CreateArticle = (props) => {
    return (
        <Container id='create-article' className="create-article">
            <Paper elevation={0} className="index-page__breadcrumb">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Dashboard
                    </Link>
                    <Link color="inherit" to="/articles">
                        Articles
                    </Link>
                    <Typography color="textPrimary">Create New</Typography>
                </Breadcrumbs>
            </Paper>

            <Paper elevation={0} className="create-article__content">
                <h1 className="create-article__content__title">Tạo mới bài viết</h1>
                <Divider />

                <form onSubmit={props.submitNewArticle} autoComplete="off">
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Tiêu đề bài viết"
                                name='title'
                                fullWidth={true}
                                value={props.article.title}
                                margin="normal"
                                onChange={props.changeTitle}
                                helperText="* Thông tin này là cố định và không thể chỉnh sửa 1 khi đã tạo, nên cân nhắc lựa chọn title chính xác !"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} justify="center" style={{marginTop: '20px'}}>
                        <Grid item>
                            <Button variant="outlined">
                                <Link color="inherit" to="/articles">
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

export default CreateArticle;
