import React, { useState, useEffect, useContext } from 'react'
import { Card, Grid, Box, TextField, Typography } from '@material-ui/core'
import { ColorButton } from './style'
import HomeworkService from '../../services/homeworkService';
import AvatarWithName from '../avatarWithName';
import UploadedDate from './uploadedDate';
import Icon from '@material-ui/core/Icon';
import { UserContext } from '../../userContext';

const modelCorrection = {
    coment: '',
    grade: ''
}

export default function StudentsHomeworkCard(props) {

    const homeworkService = new HomeworkService();

    const homework = props.homework;
    const setSnackbar = props.setSnackbar;

    const [showComment, setShowComment] = useState(false);
    const [correction, setCorrection] = useState(modelCorrection);

    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        setCorrection({
            coment: homework.coment,
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
            homeworkService.correctHomework(correction, homework.student.id, user.selectedHomework.id)
            .then( () => {
                setSnackbar({
                    open: true,
                    message: 'Tarea corregida exitosamente!',
                    severity: 'success'
                });
            })
            .catch(() => {
                setSnackbar({
                    open: true,
                    message: 'Error al corregir tarea...',
                    severity: 'success'
                });
            })
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Error al corregir tarea...',
                severity: 'success'
            });
        }
    }

    return (
        <Card>
            <Box m={2}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                        <AvatarWithName name={homework.student.name} lastName={homework.student.lastname} noShowName />
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center" spacing={2}>
                            <Grid item>
                                <Typography variant="h5" >{homework.student.name} {homework.student.lastname} </Typography>
                                <UploadedDate uploadedOutOfTerm={homework.outOfTerm} uploadDate={homework.uploadDate} />
                            </Grid>

                            <Grid item >
                                <a href={homework.file} target="_blank" style={{ color: "inherit", textDecoration: "inherit" }} download><ColorButton style={{ marginLeft: '10px' }}><Icon>get_app</Icon> descargar</ColorButton></a>
                                <ColorButton style={{ marginLeft: '10px' }} onClick={openComment}>{homework.coment ? 'ver correccion' : 'corregir'}</ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    showComment ?
                        <Grid container direction="row" justify="space-evenly" alignItems="center">
                            <TextField label='Comentario' name='coment' value={correction.coment} onChange={update}/>
                            <TextField label='Nota' type='number' name='grade' value={correction.grade} onChange={update} InputProps={{
                                inputProps: {
                                    max: 10, min: 1
                                }
                            }}/>
                            <ColorButton onClick={correct}>Enviar</ColorButton>
                        </Grid>
                        :
                        <div></div>
                }
            </Box>

        </Card>
    )
}
