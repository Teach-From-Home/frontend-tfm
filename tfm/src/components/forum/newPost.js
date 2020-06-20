import React, { useState, useContext } from 'react'
import { Grid, Card, Box, Avatar, CardHeader, TextField } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import ForumService from '../../services/forumService';
import { UserContext } from '../../userContext'

const postModel = {
    title: '',
    text: ''
}

export default function SearchPost(props) {
    const classes = useStyles();
    const [post, setPost] = useState(postModel);
    const {user, setUser} = useContext(UserContext);

    const setSnackbar = props.setSnackbar;
    const getForumPosts = props.getForumPosts;

    const forumService = new ForumService();

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setPost({ ...post, [name]: value });
    }

    const sendPost = () => {
        try {
            forumService.newPost(post, user.id, user.selectedClassroom.id)
            .then(() => getForumPosts());
            setPost(postModel);
            setSnackbar({
                open: true,
                message: 'Nuevo post agregado exitosamente!',
                severity: 'success'
            });
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'err.response.data.message', //todo ERROR ESTE
                severity: 'error'
            });
        }
    }

    const formHasData = () => {
        return post.text !== '' && post.description !== ''
    }

    return (
        <div className={classes.root}>
            <Card className={classes.searchCard}>
                <CardHeader title="Crea una publicacion" />
                <Box m={2}>
                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Avatar className={classes.largeAvatar}>{user.name ? `${user.name.charAt(0)}${user.lastName.charAt(0)} `: ''}</Avatar>
                        </Grid> 
                        <Grid item xs={9}>
                            <TextField label="Ingrese el titulo" name="title" variant="outlined" onChange={handleInputChange} value={post.title}></TextField><br/><br/>
                            <TextField label="Escribe tu mensaje..." name="text" multiline rowsMax={4} variant="outlined" onChange={handleInputChange} value={post.text}/>{/*TODO: validacion de caracteres*/} <br/>
                            { formHasData() ?
                                <ColorButton className={classes.button} onClick={sendPost}>Enviar</ColorButton>
                                :
                                <ColorButton className={classes.button} onClick={sendPost} disabled>Enviar</ColorButton>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
