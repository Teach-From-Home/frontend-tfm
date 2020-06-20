import React, { useState, useContext, useEffect } from 'react';
import { TextField, Box, Grid, Card, Typography  } from '@material-ui/core';
import { ColorButton, useStyles, YellowSwitch } from './style';
import HomeworkService from '../../services/homeworkService';
import { UserContext } from '../../userContext';

const modelHomework = {
    title: '',
    description: '',
    available: false
}

export default function NewHomework(props) {
    const classes = useStyles();

    const setSnackbar = props.setSnackbar;
    const getHomeworksTeacher = props.getHomeworksTeacher;

    const [homework, setHomework] = useState(modelHomework);
    const [switchCheck, setSwitchCheck] = useState(false);
    const homeworkService = new HomeworkService();
    const {user, setUser} = useContext(UserContext);



    useEffect(() => {
        if(user.modifyHomework){
            setHomework(user.modifyHomework); 
            setSwitchCheck(user.modifyHomework.available);
        } 
    }, [user])

    const update = e => {
        setHomework({
          ...homework,
          [e.target.name]: e.target.value
        });
    }

    const sendHomework = () => {
        if(user.modifyHomework){
            try {
                let homeworkModified = {};
                homeworkModified.title = homework.title;
                homeworkModified.description = homework.description;
                homeworkModified.available = switchCheck;
                homeworkService.modifyHomework(homeworkModified, user.modifyHomework.id)
                .then(() => getHomeworksTeacher());
                setHomework(modelHomework);
                setSnackbar({
                    open: true,
                    message: 'Tarea modificada exitosamente!',
                    severity: 'success'
                });
            } catch (error) {
                
            }
        }else{
            try {
                homeworkService.newHomework(homework, user.id, user.selectedClassroom.id)
                .then(() => getHomeworksTeacher());
                setHomework(modelHomework);
                setSnackbar({
                    open: true,
                    message: 'Nueva tarea agregada exitosamente!',
                    severity: 'success'
                });
            } catch (error) {
                
            }
        }
        
    }

    const cancel = () => {
        setUser({
            ...user,
            modifyHomework: null
        });
        setHomework(modelHomework);
        setSwitchCheck(false);
    }

    const handleChange = (event) => {
        setSwitchCheck( event.target.checked );
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        <TextField variant="outlined" margin="normal" name="title" label="Titulo" id="title" value={homework.title} onChange={update}></TextField>
                        <TextField variant="outlined" margin="normal" name="description" label="Descripcion" id="description" multiline rowsMax={4} value={homework.description} onChange={update}></TextField>
                        <Typography>Disponible</Typography>
                        <YellowSwitch checked={switchCheck} onChange={handleChange} name="switchCheck"></YellowSwitch>
                        <Grid item>
                            <ColorButton className={classes.button} onClick={cancel} style={{marginLeft: '10px'}}>Cancelar</ColorButton>
                            <ColorButton className={classes.button} onClick={sendHomework}>Subir</ColorButton>
                        </Grid>
                    </Grid>
                </Box>
                
            </Card>
        </div>
    )
}
