import React from 'react'
import { Typography, Grid, Card, Box, Avatar } from '@material-ui/core';
import { useStyles, ColorButton } from './style';

export default function ForumPost() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Grid container alignItems="center" justify="center">
                                <Avatar className={classes.largeAvatar}></Avatar>
                                <Typography variant="h6">Marcos Fernandez</Typography>
                            </Grid>
                        </Grid> 
                        <Grid item xs={10}>
                            <Typography variant="h6">Titulo tarea</Typography>
                            <Typography variant="body1"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
