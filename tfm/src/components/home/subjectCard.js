import React, { useContext } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { ColorButton, YellowTypography, useStyles } from './style';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../userContext'
import ClassroomService from '../../services/classroomService';

export default function SubjectCard({classroom}) {
    const classes = useStyles();
    const history = useHistory();
    const {user, setUser} = useContext(UserContext);
    const subject = classroom.subject;

    const classroomService = new ClassroomService();

    const redirectForum = () => {
        setUser({
            ...user,
            selectedClassroom: classroom
        });
        history.push('/forum');
    }

    const redirectHomework = () => {
        setUser({
            ...user,
            selectedClassroom: classroom
        });
        history.push('/homework');
    }

    const redirectCall = () => {
        setUser({
            ...user,
            selectedClassroom: classroom
        });
        if(user.role === 'TEACHER') classroomService.goLive(classroom.id);
        history.push('/call');
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                                <YellowTypography component="h3" variant="h4">{subject.name}</YellowTypography>
                                <Typography component="h4" variant="h5">Lunes 20:30 - 22:00 hs.</Typography>
                                <Typography component="h4" variant="h5">Profesor/a: Barbara Menchon</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs className={classes.buttons}>
                            <ColorButton className={classes.button} onClick={redirectForum}>Foro</ColorButton> 
                            <ColorButton className={classes.button} onClick={redirectHomework}>Tareas</ColorButton> 
                            {
                                user.role === 'STUDENT' ?
                                    classroom.live ? 
                                        <ColorButton className={classes.button} onClick={redirectCall}>En vivo</ColorButton>
                                    :
                                        <ColorButton disabled className={classes.button} onClick={redirectCall}>En vivo</ColorButton>
                                :
                                    <ColorButton className={classes.button} onClick={redirectCall}>Crear</ColorButton> 
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
