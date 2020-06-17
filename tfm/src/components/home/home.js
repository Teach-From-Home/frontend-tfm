import React, { Fragment, useContext, useEffect, useState } from 'react'
import SubjectCard from './subjectCard'
import { UserContext } from '../../userContext'
import ClassroomService from '../../services/classroomService'
import SnackbarOpen from '../snackbar/snackbar'

export default function Home() {
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
                    message: err.response.data.error,
                    severity: 'error'
                });
            }
        }
    }

    return (
        <Fragment>
            { 
                isLoaded ?
                    classrooms.map( c => {
                        return (<SubjectCard classroom={c} key={c.id}></SubjectCard>)
                    })
                :
                <div>CARGANDasddddddddddddddddddddddddddddddddddITO</div> //TODO CAMBIAR ESTO
            }
        </Fragment>
    )
}
