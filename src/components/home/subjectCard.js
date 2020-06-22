import React, { useContext } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { ColorButton, YellowTypography, useStyles } from './style';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../userContext'
import ClassroomService from '../../services/classroomService';

export default function SubjectCard({ classroom }) {
    const classes = useStyles();
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const subject = classroom.subject;

    const classroomService = new ClassroomService();

    const redirectForum = () => {
        setUser({
            ...user,
            selectedClassroom: classroom
        });
        localStorage.setItem('selectedClassroom', classroom.id);
        fillLocalStorage();
        history.push('/forum');
    }

    const redirectHomework = () => {
        setUser({
            ...user,
            selectedClassroom: classroom
        });
        localStorage.setItem('selectedClassroom', classroom.id);
        fillLocalStorage();
        history.push('/homework');
    }

    const redirectCall = () => {
        setUser({
            ...user,
            selectedClassroom: classroom
        });
        if (user.role === 'TEACHER') classroomService.goLive(classroom.id);
        fillLocalStorage();
        history.push('/call');
    }

    const fillLocalStorage = () => {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('classroomId', classroom.id);
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={1}>
                    <Grid container spacing={3} direction="column" alignItems="center">
                        <Grid item xs>
                            <Grid container direction="column" justify="center" alignItems="flex-start">
                                <YellowTypography component="h3" variant="h4">{subject.name}</YellowTypography>
                                <Typography component="h5" variant="h5">{classroom.name}</Typography>
                                {
                                    classroom.teachers.map(t => {
                                        return <Typography component="h5" variant="h5" key={t}>{t}</Typography>
                                    })
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs className={classes.buttons} >
                            <Grid container
                                direction="row" alignItems="center" justify="center"
                            >
                                <ColorButton className={classes.button} onClick={redirectForum}>Foro</ColorButton>
                                <ColorButton className={classes.button} onClick={redirectHomework}>Tareas</ColorButton>
                                <ColorButton className={classes.button} onClick={redirectCall}>Clase</ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
