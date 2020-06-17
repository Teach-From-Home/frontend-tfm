import React from 'react';
import { Avatar, Typography, Grid } from '@material-ui/core';

export default function AvatarWithName(props) {
    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Avatar style={{width: '60px', height: '60px'}}></Avatar>
                <Typography variant="h6">{props.name}</Typography>
            </Grid>
        </div>
    )
}
