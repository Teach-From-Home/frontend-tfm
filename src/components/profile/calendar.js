import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../userContext'
import { CircularProgress } from '@material-ui/core'
import ProfileService from '../../services/profileService'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import SingleCard from './singleEvent'

import './style.css'


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

  return (
    <div>
      {selected ? <SingleCard calendarEntry={selected} /> : null}
      <br />
      {loading ?
        <CircularProgress size={100} style={{ color: '#636363', marginTop: '150px' }} /> :
        <div>
          <FullCalendar
            locale='es'
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventBorderColor="#d6a82a"
            eventBackgroundColor="#d6a82a"
            eventTextColor="#303030"
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
