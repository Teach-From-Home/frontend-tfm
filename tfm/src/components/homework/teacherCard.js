import React, { Fragment } from 'react';
import { Typography, Grid, TextField, Icon, Box } from '@material-ui/core';
import { YellowTypography } from './style';
import HomeworkCard from './homeworkCard';
import NewHomework from './newHomework';

export default function TeacherCard(props) {
    console.log(props)
    return (
        <Fragment>
            <Grid container>
                <Grid item xs={6}>
                    <YellowTypography variant="h6">VER TAREA</YellowTypography>
                    {
                        props.homeworks.map(h => {
                            return <HomeworkCard homework={h} key={h.id} />
                        })
                    }
                </Grid>
                <Grid item xs={6}>
                    <YellowTypography variant="h6">NUEVA TAREA</YellowTypography>
                    <NewHomework></NewHomework>
                </Grid>
            </Grid>
        </Fragment>
    )
}
