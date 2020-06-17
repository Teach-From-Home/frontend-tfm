import React, { Fragment, useContext } from 'react'
import HomeworkCard from './homeworkCard'
import { UserContext } from '../../userContext'
import TeacherCard from './teacherCard'
import { useStyles } from './style';

export default function Homework() {
    const classes = useStyles();
    const {user, setUser} = useContext(UserContext)
    
    return (
        <div className={classes.backgroundImg}>
            {
                user.role == 'STUDENT' ?
                <div>
                    <HomeworkCard></HomeworkCard>
                    <HomeworkCard></HomeworkCard>
                    <HomeworkCard></HomeworkCard>
                </div>
                :
                <div>
                    <TeacherCard></TeacherCard>
                </div>
            }
            
        </div>
    )
}
