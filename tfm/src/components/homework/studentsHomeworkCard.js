import React, { useState } from 'react'
import { Card, Typography, Avatar, Button, Grid, Box, TextField } from '@material-ui/core'
import { ColorButton } from './style'

export default function StudentsHomeworkCard({homework}) {

    const [showComment, setShowComment] = useState(false);

    const openComment = () => {
        setShowComment(!showComment);
    }

    return (
        <Card>
            <Box m={2}> 
            <Grid container direction="row" justify="space-evenly" alignItems="center">
                <Avatar style={{marginLeft: '10px'}}></Avatar>
                <Typography style={{marginLeft: '10px'}}>{`${homework.student.name} ${homework.student.lastname}`}</Typography>
                <ColorButton style={{marginLeft: '10px'}}>descargar tarea</ColorButton>
                <ColorButton style={{marginLeft: '10px'}} onClick={openComment}>corregir</ColorButton>
            </Grid>
            {
                    showComment ?
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                        <TextField label='Comentario'></TextField>
                        <TextField label='Nota' ></TextField>
                        <ColorButton>Enviar</ColorButton>
                    </Grid>
                    :
                        <div></div>
                }
            </Box>

        </Card>
    )
}
