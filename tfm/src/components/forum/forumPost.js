import React, { useState, useEffect } from 'react'
import { Typography, Grid, Card, Box, Button, Divider } from '@material-ui/core';
import { useStyles } from './style';
import AvatarWithName from '../avatarWithName';
import Comments from './comments';
import ForumService from '../../services/forumService';

export default function ForumPost(props) {
    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState([]);
    
    const forumService = new ForumService();
    const post = props.post;
    const setSnackbar = props.setSnackbar;

    useEffect(() => {
        getComments();
    }, [])

    const openComments = () => {
        getComments();
    }

    const getComments = async () => {
        try {
            let data = await forumService.getPostComments(post.id);
            setComments(data);
            setIsLoaded(true);
        } catch (error) {
            
        }
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <AvatarWithName name={`${post.user.name} ${post.user.lastname}`}></AvatarWithName>
                        </Grid> 
                        <Grid item xs={9}>
                            <Typography variant="h6">{post.title}</Typography>
                            <Typography variant="body1">{post.text}</Typography>
                            <Typography variant="caption">{post.date}</Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.iconsBottom}>
                        <Grid container spacing={2}>
                            <Button onClick={openComments}>{ comments.length === 1 ?  `${ comments.length } comentario` : `${ comments.length } comentarios`}</Button>
                        </Grid>
                    </div>
                </Box>
                <Divider></Divider>
                <Comments comments={comments} postId={post.id} getComments={getComments} setSnackbar={setSnackbar}/>
            </Card>
        </div>
    )
}
