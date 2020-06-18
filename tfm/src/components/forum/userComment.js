import React, { Fragment } from 'react'
import { Grid, Avatar, Typography } from '@material-ui/core';

export default function UserComment({ comment }) {
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={'auto'}>
                    <Avatar></Avatar>
                </Grid> 
                <Grid item xs={'auto'}>
                    <Typography>{comment.text}</Typography>
                </Grid>
            </Grid>
        </Fragment>
    )
}
