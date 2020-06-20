import React, { useEffect, useContext, useState } from 'react'
import { Card, Grid } from '@material-ui/core'
import { UserContext } from '../../userContext';
import HomeworkService from '../../services/homeworkService';
import StudentsHomeworkCard from './studentsHomeworkCard';

export default function StudentsHomework() {

    const [homeworks, setHomeworks] = useState([]);
    
    const {user, setUser} = useContext(UserContext);


    const homeworkService = new HomeworkService();

    useEffect(() => {
        getStudentsHomework();
    }, []);

    const getStudentsHomework = async () => {
        try {
            let hs = await homeworkService.getStudentsHomework(user.selectedHomework.id, user.id);
            setHomeworks(hs);            
        } catch (error) {
            
        }
    }

    return (
        <div>
            <Grid container>
                {
                    homeworks ?
                    homeworks.map( h => {
                        return <StudentsHomeworkCard homework={h} key={h.id}></StudentsHomeworkCard>
                    })
                    :
                    <div></div>
                }
            </Grid>
        </div>
    )
}
