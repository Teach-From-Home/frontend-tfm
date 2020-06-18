import React, { Fragment, useState } from 'react'
import { Typography, Grid, Card, Box, Button, Divider } from '@material-ui/core';
import { useStyles } from './style';
import AvatarWithName from '../avatarWithName';
import { ColorButton } from '../home/style';
import Icon from '@material-ui/core/Icon'
import Comments from './comments';
import ForumService from '../../services/forumService';

export default function ForumPost(props) {
    const classes = useStyles();
    const [showComments, setShowComments] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState([]);
    
    const forumService = new ForumService();
    const post = props.post;
    const setSnackbar = props.setSnackbar;

    const openComments = async () => {
        await getComments();
        setShowComments(!showComments);
    }

    const getComments = async () => {
        if(!isLoaded){
            try {
                let data = await forumService.getPostComments(post.id);
                setComments(data);
                setIsLoaded(true);
            } catch (error) {
                
            }
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
                        </Grid>
                    </Grid>
                    <div className={classes.iconsBottom}>
                        <Grid container spacing={2}>
                            <Button onClick={openComments}>{ post.commentsAmount === 1 ?  `${post.commentsAmount } comentario` : `${post.commentsAmount} comentarios`}</Button>
                        </Grid>
                    </div>
                </Box>
                <Divider></Divider>
                <Comments comments={comments} setSnackbar={setSnackbar}/>
            </Card>
        </div>
    )
}
