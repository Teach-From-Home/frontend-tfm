import React, { Fragment } from 'react'
import { Grid, Card, Box, Avatar, CardHeader, TextField, Typography, Divider } from '@material-ui/core';

export default function UserComment() {
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={'auto'}>
                    <Avatar></Avatar>
                </Grid> 
                <Grid item xs={'auto'}>
                    <Typography>La verdad que esta cursada es una mierda, lucas explica como el orto</Typography>
                </Grid>
            </Grid>
        </Fragment>
    )
}
