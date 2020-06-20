import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Box, Avatar, CardHeader, TextField } from '@material-ui/core';
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

    const { onClose, open, setSnackbar} = props;

    const {user, setUser} = useContext(UserContext);
    
    const [post, setPost] = useState(user.editPost);
    
    const forumService = new ForumService();

    const handleClose = () => {
      onClose();
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setPost({ ...post, [name]: value });
    }

    const sendPost = () => {
        try {
            forumService.editPost(post, post.id)
            .then( () => {
                setPost(postModel);
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

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={"sm"} spacing={2}>
            <DialogContent>
            {console.log(user.editPost)}
            {
                user.editPost ? 
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Avatar className={classes.largeAvatar}>{user.name ? `${user.name.charAt(0)}${user.lastName.charAt(0)} `: ''}</Avatar>
                        </Grid> 
                        <Grid item xs={9}>
                            <TextField label="Ingrese el titulo" name="title" variant="outlined" onChange={handleInputChange} value={post.title ? post.title : ''}></TextField><br/><br/>
                            <TextField label="Escribe tu mensaje..." name="text" multiline rowsMax={4} variant="outlined" onChange={handleInputChange} value={post.text ? post.text : ''}/>{/*TODO: validacion de caracteres*/} <br/>
                            <ColorButton onClick={sendPost} className={classes.button}>Enviar</ColorButton>
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