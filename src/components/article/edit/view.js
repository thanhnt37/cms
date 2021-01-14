import React from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Grid,
    Paper,
    Modal,
    Breadcrumbs,
    InputLabel,
    FormControlLabel,
    TextField,
    Typography,
    Button,
    Backdrop,
    Fade,
    Divider,
    Switch,
    Select,
    MenuItem,
    Input,
    Chip,
    FormControl
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Include font-awesome css if required.
// install using "npm install font-awesome --save"
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/third_party/font_awesome.min.js';

// Include special components if required.
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

// Import a single Froala Editor plugin.
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
// import 'froala-editor/js/plugins/entities.min.js';  // A list with the characters that are reserved in HTML. More details about using entities in HTML can be found on W3C and Wikipedia.
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/video.min.js';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import './styles.scss';

const renderEditor = (props) => {
    if(props.imageUploadToS3 !== undefined) {
        return (
            <FroalaEditor
                name="content"
                tag='textarea'
                model={props.article.content}
                onModelChange={props.changePreviewContent}
                config={
                    {
                        attribution: false,
                        placeholderText: 'Write your article content here ...',
                        fontSizeDefaultSelection: '14',
                        pastePlain: true,
                        imageUploadToS3: props.imageUploadToS3
                    }
                }
            />
        );
    }
}

const renderTableOfContents = (props) => {
    if(props.article.table_of_contents && (props.article.table_of_contents !== '<ol></ol>')) {
        return (
            <div className="table-of-contents">
                <h3>Nội dung chính</h3>
                <div dangerouslySetInnerHTML={{ __html: props.article.table_of_contents }} />
            </div>
        );
    }

    return '';
}

const ArticlesDetail = (props) => {
    return (
        <Container id='article-detail' className="article-detail">
            <Paper elevation={0} className="index-page__breadcrumb">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Dashboard
                    </Link>
                    <Link color="inherit" to="/articles">
                        Articles
                    </Link>
                    <Typography color="textPrimary">{props.article.slug}</Typography>
                </Breadcrumbs>
            </Paper>

            <Paper elevation={0} className="article-detail__content">
                <h1 className="article-detail__content__title">{props.article.title}</h1>
                <Divider />

                <form onSubmit={props.handleSubmit} autoComplete="off">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6} style={{textAlign: 'center'}}>
                            <img src={props.article.cover_image || props.article.poster} alt="" style={{width: "100%"}}/>
                            <Button variant="contained" component="label" style={{boxShadow: 'none',  background: 'none', color: '#1cbacc', textTransform: 'none'}}>
                                Edit (maximum 720x405)
                                <input
                                    type="file"
                                    name="poster"
                                    style={{ display: "none" }}
                                    onChange={props.changeTextField}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        label="Title"
                                        name='title'
                                        fullWidth={true}
                                        value={props.article.title}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        disabled
                                        label="Slug"
                                        fullWidth={true}
                                        margin="normal"
                                        value={props.article.slug}
                                    />
                                </Grid>
                            </Grid>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="published_at">
                                            Published At
                                        </InputLabel>
                                        <KeyboardDateTimePicker
                                            id="published_at"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            value={props.article.published_at}
                                            onChange={props.changeDateTime}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="is_enabled">
                                            is Enabled
                                        </InputLabel>
                                        <FormControlLabel
                                            checked={JSON.parse(props.article.is_enabled)}
                                            control={<Switch size="medium" color="primary" />}
                                            margin="normal"
                                            id="is_enabled"
                                            name="is_enabled"
                                            onChange={props.changeTextField}
                                        />
                                    </Grid>
                                    {
                                        props.showPublishButton &&
                                        <Grid item xs={12} style={{marginTop: '20px'}}>
                                            <InputLabel htmlFor="rendering_style">
                                                Rendering Style
                                            </InputLabel>
                                            <TextField
                                                type="number"
                                                name='rendering_style'
                                                value={props.article.rendering_style || 1}
                                                onChange={props.changeTextField}
                                            />
                                        </Grid>
                                    }
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="tags" style={{marginBottom: '10px', fontSize: '12px'}}>
                                Tags*
                            </InputLabel>
                            <TagsInput required id="tags" value={props.article.tags} onChange={props.changeTags} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl style={{width: '100%'}}>
                                <InputLabel id="related-articles">Related Articles</InputLabel>
                                <Select
                                    required
                                    labelId="related-label"
                                    name="related_articles"
                                    multiple
                                    fullWidth={true}
                                    value={props.article.related_articles.split(', ')}
                                    onChange={props.changeTextField}
                                    input={<Input />}
                                    renderValue={selected => (
                                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} style={{margin: '0 5px 5px 0'}} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {props.allSlugs.map(article => (
                                        <MenuItem key={article.slug} value={article.slug}>
                                            {article.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Description"
                                name="description"
                                fullWidth={true}
                                multiline
                                rows="4"
                                variant="outlined"
                                margin="normal"
                                value={props.article.description}
                                onChange={props.changeTextField}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            { renderTableOfContents(props) }
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {renderEditor(props)}
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
                            <Button variant="outlined" style={{color: '#4caf50', borderColor: '#4caf50'}} onClick={props.openPreview}>
                                Preview
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button type='submit' variant="outlined" color="primary">
                                Submit
                            </Button>
                        </Grid>
                        {
                            props.showPublishButton &&
                                <Grid item>
                                    <Button variant="outlined" color="warning" onClick={props.publishArticle}>
                                        Go Production
                                    </Button>
                                </Grid>
                        }

                    </Grid>
                </form>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
                    open={props.previewModal.isOpen}
                    onClose={props.closePreview}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{timeout: 500}}
                >
                    <Fade in={props.previewModal.isOpen}>
                        <Paper className="article__preview__wrapper">
                            <h1 className="title">
                                {props.article.title}
                            </h1>

                            <div className="descriptions">
                                {props.article.description}
                            </div>

                            <img className="cover-image" src={props.article.cover_image || props.article.poster} />

                            { renderTableOfContents(props) }

                            <FroalaEditorView
                                model={props.article.content}
                            />
                        </Paper>
                    </Fade>
                </Modal>
            </Paper>
        </Container>
    );
};

export default ArticlesDetail;
