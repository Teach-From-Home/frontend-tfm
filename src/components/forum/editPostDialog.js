import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, TextField, CircularProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import { UserContext } from '../../userContext';
import ForumService from '../../services/forumService';

const postModel = {
    title: '',
    text: ''
}

export default function EditPostDialog(props) {
    const classes = useStyles();

    const { onClose, open, setSnackbar } = props;

    const { user } = useContext(UserContext);

    const [post, setPost] = useState(user.editPost);
    const [loading, setloading] = useState(false)

    const forumService = new ForumService();

    const handleClose = () => {
        onClose();
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setPost({ ...post, [name]: value });
    }

    const sendPost = () => {
        setloading(true)
        try {
            forumService.editPost(post, post.id)
                .then(() => {
                    setPost(postModel);
                    setloading(false)
                    setSnackbar({
                        open: true,
                        message: 'Post editado exitosamente!',
                        severity: 'success'
                    });
                    handleClose();
                })
                .catch((err) => {
                    setSnackbar({
                        open: true,
                        message: 'Error al modificar post, intente nuevamente.', //todo ERROR ESTE
                        severity: 'error'
                    });
                })
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Error al modificar post, intente nuevamente.', //todo ERROR ESTE
                severity: 'error'
            });
        }
    }
    const formHasData = () => {
        return post.text !== '' && post.description !== ''
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={"sm"} spacing={2}>
            <DialogContent>
                {
                    user.editPost ?
                        <Box m={2}>
                            <Grid container spacing={1}>

                                <Grid item xs={'auto'}>
                                    <TextField label="Ingrese el titulo" name="title" variant="outlined" onChange={handleInputChange} value={post.title}></TextField><br /><br />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField label="Escribe tu mensaje..." name="text" multiline rowsMax={50} variant="outlined" onChange={handleInputChange} value={post.text} fullWidth />{/*TODO: validacion de caracteres*/} <br />
                                </Grid>
                                <Grid item xs={12}>

                                    {loading ?
                                        <CircularProgress size={24} style={{ color: '#636363', marginLeft: '10px', marginTop: '13px' }} />
                                        :
                                        <ColorButton className={classes.button} onClick={sendPost} disabled={!formHasData()}>Enviar</ColorButton>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                        :
                        <div></div>
                }
            </DialogContent>
        </Dialog>
    )
}

EditPostDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setSnackbar: PropTypes.func.isRequired
};