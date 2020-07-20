import React, { useContext } from 'react'
import { Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../userContext'


function SingleEvent(props) {
    const history = useHistory()
    const { user } = useContext(UserContext);


    const redirect = (url) => {
        fillLocalStorage();
        history.push(url)
    }

    const fillLocalStorage = () => {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('classroomId', props.calendarEntry.extendedProps.classroomId);
    }

    return (
        <div>
            <Typography variant="h5">Consigna: {props.calendarEntry.title}</Typography>
            <br />
            <Typography variant="body1" color="textSecondary">Fecha limite: {props.calendarEntry.extendedProps.deadLine}</Typography>
            <Typography variant="body1" color="textSecondary">Materia: {props.calendarEntry.extendedProps.subjectName}</Typography>
            {props.calendarEntry.extendedProps.type === "HW" ?
                <Button onClick={()=>redirect("/homework")} > Ver tareas</Button>
                : <Button onClick={()=>redirect("/exam")} > Ver examenes </Button>
            }

            <hr />

        </div>
    )
}

export default SingleEvent
