import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../userContext'
import { CircularProgress, Typography } from '@material-ui/core'
import ProfileService from '../../services/profileService'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import SingleCard from './singleEvent'



const Calendars = () => {
  const service = new ProfileService()
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true)
  const [calendar, setcalendar] = useState([])
  const [selected, setSelected] = useState()

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
          return (<div key={id}> {SingleCard(entry)} </div>)
        })}

      </div>)
  }


  return (
    <div>
      {selected ? <SingleCard calendarEntry={selected} /> : null}
      <br />
      {loading ?
        <CircularProgress size={100} style={{ color: '#636363', marginTop: '150px' }} /> :
        <div style={{ height: '500px' }}>
          <FullCalendar
            locale='es'
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventBorderColor="#636363"
            eventBackgroundColor="#d6a82a"
            eventClick={(e) => setSelected(e.event)}
            headerToolbar={{
              left: 'title',
              right: 'today,prev,next'
            }}
            buttonText={{ today: 'Hoy' }}
            events={calendar}
          />
        </div>}
    </div>
  )
}

export default Calendars
