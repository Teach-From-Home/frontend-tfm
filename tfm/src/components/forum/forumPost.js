import React, { Fragment, useState } from 'react'
import { Typography, Grid, Card, Box, Button, Divider } from '@material-ui/core';
import { useStyles } from './style';
import AvatarWithName from '../avatarWithName';
import { ColorButton } from '../home/style';
import Icon from '@material-ui/core/Icon'
import Comments from './comments';

export default function ForumPost({ post }) {
    const classes = useStyles();
    const [showComments, setShowComments] = useState(false);

    const openComments = () => {
        setShowComments(!showComments);
    }

    const openNewComment = () => {

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
                            <Button onClick={openNewComment}><Icon>chat</Icon>Comentar</Button>
                            <Button onClick={openComments}>5 comentarios</Button>
                        </Grid>
                    </div>
                    
                </Box>
                <Divider></Divider>
                {
                    showComments ? 
                        <Comments></Comments>
                    :
                        <div></div>
                }    



            </Card>
        </div>
    )
}
