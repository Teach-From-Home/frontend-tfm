import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Typography, Grid, TextField, Icon, Box } from '@material-ui/core';
import { YellowTypography } from './style';
import HomeworkCard from './homeworkCard';
import NewHomework from './newHomework';
import HomeworkService from '../../services/homeworkService';
import { UserContext } from '../../userContext';

export default function TeacherCard(props) {

    const [homeworks, setHomeworks] = useState();

    const setSnackbar = props.setSnackbar;
    const getHomeworks = props.getHomeworks;

    const homeworkService = new HomeworkService();
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        getHomeworksTeacher();
        setUser({
            ...user,
            selectedHomework: null
        })
    }, [])

    const getHomeworksTeacher = async () => {
        try {
            let homeworks = await homeworkService.getHomework(user.id, user.selectedClassroom.id);
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
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="space-between"
                    container
                
                >
                    
                    <Grid item xs>
                        <YellowTypography variant="h6">{user.modifyHomework ? "MODIFICAR TAREA" : "NUEVA TAREA"}</YellowTypography>
                        <NewHomework setSnackbar={setSnackbar} getHomeworksTeacher={getHomeworksTeacher}></NewHomework>
                    </Grid>
                    <hr/>
                    <Grid item xs>
                        
                        <YellowTypography variant="h6">VER TAREA</YellowTypography>
                        {
                            homeworks ? 
                                homeworks.map( h => {
                                    return <HomeworkCard homework={h} key={h.id}/>
                                })
                            :
                            <div></div>
                        }
                    </Grid>
                    
                </Grid>
            </Box>
        </Fragment>
    )
}
