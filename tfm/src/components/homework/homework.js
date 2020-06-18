import React, { useContext, useEffect, useState } from 'react';
import HomeworkCard from './homeworkCard';
import { UserContext } from '../../userContext';
import TeacherCard from './teacherCard';
import { useStyles } from './style';
import HomeworkService from '../../services/homeworkService';
import SnackbarOpen from '../snackbar/snackbar';

export default function Homework() {
    const classes = useStyles();
    const {user, setUser} = useContext(UserContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [homeworks, setHomeworks] = useState();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const homeworkService = new HomeworkService();

    useEffect(() => {
        getHomeworks();
    }, [])

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbar({
          ...snackbar,
          open: false,
        });
      }

    const getHomeworks = async () => {
        if(!isLoaded){
            try {
                debugger;
                let homeworks = await homeworkService.getHomework(user.id, user.selectedClassroom.id);
                debugger;
                setHomeworks(homeworks);
                setIsLoaded(true);
            } catch (err) {
                setSnackbar({
                    open: true,
                    message: err.message,
                    severity: 'error'
                });
            }
        }
    }

    return (
        <div className={classes.backgroundImg}>
            {
                user.role === 'STUDENT' ?
                <div>
                    {
                        isLoaded ? 
                            homeworks.map(h => {
                                return <HomeworkCard homework={h} key={h.id}/>
                            })
                        :
                        <div></div>
                    }
                    
                </div>
                :
                <div>
                    <TeacherCard homeworks={homeworks}></TeacherCard>
                </div>
            }
        <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar}/>
        </div>
    )
}
