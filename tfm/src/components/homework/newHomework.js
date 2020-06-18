import React, { useState, useContext } from 'react';
import { TextField, Box, Grid, Card } from '@material-ui/core';
import { ColorButton, useStyles } from './style';
import HomeworkService from '../../services/homeworkService';
import { UserContext } from '../../userContext';

const modelHomework = {
    title: '',
    description: ''
}

export default function NewHomework() {
    const classes = useStyles();
    const [homework, setHomework] = useState(modelHomework);

    const homeworkService = new HomeworkService();
    const {user, setUser} = useContext(UserContext);

    const update = e => {
        setHomework({
          ...homework,
          [e.target.name]: e.target.value
        });
    }

    const sendHomework = () => {
        try {
            homeworkService.newHomework(homework, user.id, user.selectedClassroom.id)
            setHomework(modelHomework);
            
        } catch (error) {
            
        }
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        <TextField variant="outlined" margin="normal" name="title" label="Titulo" id="title" value={homework.title} onChange={update}></TextField>
                        <TextField variant="outlined" margin="normal" name="description" label="Descripcion" id="description" multiline rowsMax={4} value={homework.description} onChange={update}></TextField>
                        <ColorButton className={classes.button} onClick={sendHomework}>Subir</ColorButton>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}
