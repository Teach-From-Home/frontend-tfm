import React from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { ColorButton, YellowTypography, useStyles } from './style';
import Box from '@material-ui/core/Box';

export default function SubjectCard(props) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                                <YellowTypography component="h3" variant="h4">Base de datos</YellowTypography>
                                <Typography component="h4" variant="h5">Lunes 20:30 - 22:00 hs.</Typography>
                                <Typography component="h4" variant="h5">Profesor/a: Barbara Menchon</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs className={classes.buttons}>
                            <ColorButton className={classes.button}>Acceder</ColorButton> 
                            <ColorButton className={classes.button}>Tareas</ColorButton> 
                            <ColorButton className={classes.button}>En vivo</ColorButton>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
