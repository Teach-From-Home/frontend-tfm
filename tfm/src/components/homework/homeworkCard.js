import React from 'react'
import { Typography, Grid, Card, Box, Avatar } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import AvatarWithName from '../avatarWithName';

export default function HomeworkCard({homework}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <AvatarWithName name="Pedro Alfonso"></AvatarWithName>
                        </Grid> 
                        <Grid item xs={10}>
                            <Typography variant="h6">{homework.title}</Typography>
                            <Typography variant="body1">{homework.description}</Typography>
                            <ColorButton className={classes.button}>Enviar</ColorButton>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
