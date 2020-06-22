import React, { Fragment, useState, useContext, useEffect } from 'react';
import {  Grid, Box, CircularProgress } from '@material-ui/core';
import { YellowTypography } from './style';
import HomeworkCard from './homeworkCard';
import NewHomework from './newHomework';
import HomeworkService from '../../services/homeworkService';
import { UserContext } from '../../userContext';

export default function TeacherCard(props) {

    const [homeworks, setHomeworks] = useState();

    const setSnackbar = props.setSnackbar;

    const homeworkService = new HomeworkService();
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        getHomeworksTeacher();
        setUser({
            ...user,
            selectedHomework: null
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getHomeworksTeacher = async () => {

        let classroomId = localStorage.getItem('classroomId');

        try {
            let homeworks = await homeworkService.getHomework(user.id, classroomId);
            setHomeworks(homeworks);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.message,
                severity: 'error'
            });
        }
    }
    
    return (
        <Fragment>
            <Box m={5}>
                <Grid container direction="row" justify="center" >
                    <Grid item xs>
                        <YellowTypography variant="h6">{user.modifyHomework ? "MODIFICAR TAREA" : "NUEVA TAREA"}</YellowTypography>
                        <NewHomework setSnackbar={setSnackbar} getHomeworksTeacher={getHomeworksTeacher}></NewHomework>
                    </Grid>
                    <Grid item xs>
                        <YellowTypography variant="h6">VER TAREA</YellowTypography>
                        {
                            homeworks ? 
                                homeworks.map( h => {
                                    return <HomeworkCard teacher homework={h} key={h.id}/>
                                })
                            :
                            <CircularProgress size={100} style={{color:'#636363', marginTop: '200px'}}/>

                        }
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    )
}
