import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../userContext'
import { CircularProgress, Card, Typography, CardHeader } from '@material-ui/core';
import ProfileService from '../../services/profileService'

const Calendar = () => {
    const service = new ProfileService()
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const [calendar, setcalendar] = useState([])

    useEffect(() => {
        const res = service.getCalendar(user.id)
            .then((res) => {
                setLoading(!loading)
                setcalendar(res)
            })
    }, [])

    const renderCard = () => {
        if (calendar.length == 0) return (<Typography variant="h4" >No hay eventos para mostrar</Typography>)
        return (
            <div>
                <Typography variant="h4" >Calendario</Typography>   <br />
                <hr/>
                {calendar.map((entry,id)=>{
                    return (<div key={id}> {singleCard(entry)} </div>)
                })}

            </div>)
    }

    const singleCard = calendarEntry => {
        return (
            <div>
                <Typography variant="h5">Tarea: {calendarEntry.title}</Typography>
                <br />
                <Typography variant="body1" color="textSecondary">Fecha limite: {calendarEntry.deadLine}</Typography>
                <Typography variant="body1" color="textSecondary">Materia: {calendarEntry.subjectName}</Typography>
                <hr/>
            </div>)
    }

    return (
        <div>
            <br/>
            {loading ?
                <CircularProgress /> :
                <div >
                    {renderCard()}
                </div>}
        </div>
    )
}

export default Calendar
