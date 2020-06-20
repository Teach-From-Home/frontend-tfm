import React, { Fragment } from 'react'
import { Grid, Avatar, Typography } from '@material-ui/core';

export default function UserComment({ comment }) {
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={'auto'}>
                    <Avatar>{`${comment.user.name.charAt(0)}${comment.user.lastname.charAt(0)}`}</Avatar>
                </Grid> 
                <Grid item xs={'auto'}>
                    <Typography>{comment.text}</Typography>
                </Grid>
                <Grid item xs={'auto'}>
                    <Typography variant="caption">{comment.date}</Typography>
                </Grid>
            </Grid>
        </Fragment>
    )
}
