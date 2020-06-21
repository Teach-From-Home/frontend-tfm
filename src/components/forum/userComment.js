import React, { Fragment } from 'react'
import { Grid, Avatar, Typography } from '@material-ui/core';
import AvatarWithName from '../avatarWithName';

export default function UserComment({ comment }) {
    return (
        <Fragment>
        <br/>
            <Grid container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="center">
                <Grid container xs={'auto'} justify="flex-start" alignItems="center" direction="row">
                <AvatarWithName name={comment.user.name} lastName={comment.user.lastname} noShowName/><br />
                    <Grid item xs={2} >
                        <Typography variant="body3">{comment.user.name} {comment.user.lastname}</Typography>
                    </Grid>
                    -
                    <Grid item xs={2} >
                        <Typography variant="caption">{comment.date}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={'auto'}>
                    <Typography>{comment.text}</Typography>
                </Grid>
            </Grid>
        </Fragment>
    )
}
