import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../userContext'
import { CircularProgress, Typography } from '@material-ui/core'
import ProfileService from '../../services/profileService'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const Calendars = () => {
    const service = new ProfileService()
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const [calendar, setcalendar] = useState([])

    useEffect(() => {
        service.getCalendar(user.id)
            .then((res) => {
                setLoading(!loading)
                setcalendar(res)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderCard = () => {
        // eslint-disable-next-line eqeqeq
        if (calendar.length == 0) return (<Typography variant="h4" >No hay eventos para mostrar</Typography>)
        return (
            <div>
                <Typography variant="h4" >Calendario</Typography>   <br />
                <hr />
                {calendar.map((entry, id) => {
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
                <hr />
            </div>)
    }

    return (
        <div>
            <br />
            {loading ?
                <CircularProgress size={100} style={{ color: '#636363', marginTop: '150px' }} /> :
                <div >
                    {renderCard()}
                </div>}
            <div style={{height:'500px'}}>
                <Calendar
                    localizer={localizer}
                    events={[]}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </div>
    )
}

export default Calendars
