import React from 'react'
import { Typography } from '@material-ui/core'

function singleEvent(props) {
    return (
        <div>
            <Typography variant="h5">Tarea: {props.calendarEntry.title}</Typography>
            <br />
            <Typography variant="body1" color="textSecondary">Fecha limite: {props.calendarEntry.extendedProps.deadLine}</Typography>
            <Typography variant="body1" color="textSecondary">Materia: {props.calendarEntry.extendedProps.subjectName}</Typography>
            ir
            <hr />

        </div>
    )
}

export default singleEvent
