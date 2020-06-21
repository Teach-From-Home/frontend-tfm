import React, { useState, useEffect } from 'react'
import { Card, Grid, Box, TextField } from '@material-ui/core'
import { ColorButton } from './style'
import HomeworkService from '../../services/homeworkService';
import AvatarWithName from '../avatarWithName';
import UploadedDate from './uploadedDate';
import Icon from '@material-ui/core/Icon';

const modelCorrection = {
    comment: '',
    grade: 4
}

export default function StudentsHomeworkCard({homework}) {

    const homeworkService = new HomeworkService();

    const [showComment, setShowComment] = useState(false);
    const [correction, setCorrection] = useState(modelCorrection);

    useEffect(() => {
        setCorrection({
            comment: homework.coment,
            grade: homework.grade
        });
    }, []);

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
            <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item>
                    <AvatarWithName name={homework.student.name} lastName={homework.student.lastname} noShowName/>                
                </Grid>
                <Grid item>
                    <UploadedDate uploadedOutOfTerm={homework.outOfTerm} uploadDate={homework.uploadDate}/>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="space-evenly" alignItems="center">
                <ColorButton style={{marginLeft: '10px'}}><Icon>get_app</Icon>descargar</ColorButton>
                <ColorButton style={{marginLeft: '10px'}} onClick={openComment}>{homework.coment ? 'ver correccion' : 'corregir'}</ColorButton>
            </Grid>
            {
                showComment ?
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                        <TextField label='Comentario' name='comment' value={correction.comment} onChange={update}></TextField>
                        <TextField label='Nota' type='number' name='grade' value={correction.grade} onChange={update} InputProps={{
                            inputProps: { 
                                max: 10, min: 1
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
