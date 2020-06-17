import React, { useState } from 'react';
import { TextField, Box, Grid, Card } from '@material-ui/core';
import { ColorButton, useStyles } from './style';

export default function NewHomework() {
    const classes = useStyles();
    const [homework, setHomework] = useState({
        title: '',
        description: ''
    });

    const update = e => {
        setHomework({
          ...homework,
          [e.target.name]: e.target.value
        });
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        <TextField variant="outlined" margin="normal" name="title" label="Titulo" id="title" value={homework.title} onChange={update}></TextField>
                        <TextField variant="outlined" margin="normal" name="description" label="Descripcion" id="description" multiline rowsMax={4} value={homework.description} onChange={update}></TextField>
                        <ColorButton className={classes.button}>Subir</ColorButton>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
