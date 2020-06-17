import React from 'react'
import { Typography, Grid, Box, Avatar } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import UserData from './userData';

export default function Profile() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <UserData></UserData>
                    </Grid> 
                    <Grid item xs={6}>
                        holi
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
