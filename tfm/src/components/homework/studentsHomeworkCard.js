import React, { useState } from 'react'
import { Card, Typography, Avatar, Button, Grid, Box, TextField } from '@material-ui/core'
import { ColorButton } from './style'
import HomeworkService from '../../services/homeworkService';
import AvatarWithName from '../avatarWithName';

const modelCorrection = {
    comment: '',
    grade: 4
}

export default function StudentsHomeworkCard({homework}) {

    const homeworkService = new HomeworkService();

    const [showComment, setShowComment] = useState(false);
    const [correction, setCorrection] = useState(modelCorrection);

    const openComment = () => {
        setShowComment(!showComment);
    }

    const update = e => {
        setCorrection({
          ...correction,
          [e.target.name]: e.target.value
        });
    }

    const correct = () => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <Card>
            <Box m={2}> 
            <Grid container direction="row" justify="space-evenly" alignItems="center">
                <AvatarWithName name={homework.user.name} lastName={homework.user.lastName} noShowName/>
                <ColorButton style={{marginLeft: '10px'}}>descargar tarea</ColorButton>
                <ColorButton style={{marginLeft: '10px'}} onClick={openComment}>corregir</ColorButton>
            </Grid>
            {
                showComment ?
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                        <TextField label='Comentario' name='comment' value={correction.comment} onChange={update}></TextField>
                        <TextField label='Nota' type='number' name='grade' value={correction.grade} onChange={update} InputProps={{
                            inputProps: { 
                                max: 10, min: 0 
                            }
                        }}></TextField>
                        <ColorButton onClick={correct}>Enviar</ColorButton>
                    </Grid>
                :
                    <div></div>
            }
            </Box>

        </Card>
    )
}
