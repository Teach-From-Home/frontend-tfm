import React, { Fragment, useContext, useEffect, useState } from 'react'
import SubjectCard from './subjectCard'
import { UserContext } from '../../userContext'
import ClassroomService from '../../services/classroomService'
import SnackbarOpen from '../snackbar/snackbar'
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from './style'


export default function Home() {
    const classes = useStyles();
    const [classrooms, setClassrooms] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const {user, setUser} = useContext(UserContext);
    const classroomService = new ClassroomService();

    useEffect(() => {
        getClassrooms()
    }, []);

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbar({
          ...snackbar,
          open: false,
        });
    }

    const getClassrooms = async() => {
        if(!isLoaded){
            try {
                let classrooms = await classroomService.getClassroom(user.id);
                setClassrooms(classrooms);
                setUser({
                    ...user,
                    classrooms: classrooms
                });
                setIsLoaded(true);
            } catch (err) {
                setSnackbar({
                    open: true,
                    message: 'Error al cargar los classrooms...',
                    severity: 'error'
                });
            }
        }
    }

    return (
        <Fragment>
            <div className={classes.backgroundImg}>
                { 
                    isLoaded ?
                        classrooms.map( c => {
                            return (<SubjectCard classroom={c} key={c.id}></SubjectCard>)
                        })
                    :
                    <div><CircularProgress size={100} style={{color:'#d6a82a', marginTop: '300px'}}/></div> 
                }
                <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar}/>
            </div>
        </Fragment>
    )
}
