import React from 'react'
import { Typography, Grid, Card, Box, Avatar, CardHeader, TextField } from '@material-ui/core';
import { useStyles, ColorButton } from './style';

export default function SearchPost() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.searchCard}>
                <CardHeader title="Crea una publicacion" />
                <Box m={2}>
                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                                <Avatar className={classes.largeAvatar}></Avatar>
                        </Grid> 
                        <Grid item xs={9}>
                            <TextField id="outlined-multiline-flexible" label="Escribe tu mensaje..." multiline rowsMax={4} variant="outlined" />{/*TODO: validacion de caracteres*/} <br/>
                            <ColorButton className={classes.button}>Enviar</ColorButton>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
