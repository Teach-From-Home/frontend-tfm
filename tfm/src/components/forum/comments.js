import React from 'react'
import { Grid, Card, Box, Avatar, CardHeader, TextField, Typography, Divider } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import UserComment from './userComment';

export default function Comments() {
    const classes = useStyles();

    return (
        <div >
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid item xs={'auto'}>
                        <Avatar></Avatar>
                    </Grid> 
                    <Grid item xs={'auto'}>
                        <div className={classes.iconsBottom}>
                            <TextField label="Escribe tu mensaje..." multiline rowsMax={4} variant="outlined" />{/*TODO: validacion de caracteres*/} <br/>
                            <ColorButton>Enviar</ColorButton>
                        </div>
                    </Grid>
                </Grid>
                <UserComment></UserComment>
            </Box>
            
    </div>
    )
}
