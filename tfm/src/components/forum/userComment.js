import React, { Fragment } from 'react'
import { Grid, Avatar, Typography } from '@material-ui/core';

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
                    <Avatar>{`${comment.user.name.charAt(0)}${comment.user.lastname.charAt(0)}`}</Avatar><br />
                    <Grid item xs={2} >
                        <Typography variant="caption">{comment.user.name} {comment.user.lastname}</Typography>
                    </Grid>
                    <Grid item xs={3} >
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
