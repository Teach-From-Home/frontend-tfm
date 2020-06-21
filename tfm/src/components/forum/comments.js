import React, { useState, useContext } from 'react'
import { Grid, Box, Avatar, CardHeader, TextField, Typography, Divider } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import UserComment from './userComment';
import ForumService from '../../services/forumService';
import { UserContext } from '../../userContext'
import AvatarWithName from '../avatarWithName';

const commentModel = {
    text: ''
}

export default function Comments(props) {
    const classes = useStyles();
    const [comment, setComment] = useState(commentModel)
    const { user, setUser } = useContext(UserContext);

    const postId = props.postId;
    const comments = props.comments;
    const getComments = props.getComments;
    const setSnackbar = props.setSnackbar;

    const forumService = new ForumService();

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setComment({ ...comment, [name]: value });
    }

    const sendComment = async () => {
        try {
            await forumService.newComment(comment, user.id, postId);
            setComment(commentModel);
            setSnackbar({
                open: true,
                message: 'Comentario agregado exitosamente!',
                severity: 'success'
            });
            getComments();
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'err.response.data.message', //TODO!
                severity: 'error'
            });
        }
    }

    const formHasData = comment.text !== ''


    return (
        <div >
            <Box m={2} >
                <Grid container spacing={2} justify="center">
                    <Grid item xs={0}>
                        <AvatarWithName name={user.name} lastName={user.lastName} noShowName/>
                    </Grid>
                    <Grid item xs={0}>
                        <div className={classes.iconsBottom}>
                            <TextField label="Escribe tu comentario..." multiline rowsMax={50} variant="outlined" name='text'  onChange={handleInputChange} value={comment.text} />{/*TODO: validacion de caracteres*/} <br />

                            <ColorButton style={{ marginLeft: '10px', marginTop: '10px' }} onClick={sendComment} disabled={!formHasData} >Enviar</ColorButton>
                        </div>
                    </Grid>
                </Grid>
                <br/>
                {
                    comments.map(c => {
                        
                        return <span><hr/><UserComment comment={c} key={c.id} /></span>
                    })
                }

            </Box>

        </div>
    )
}
