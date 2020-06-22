import React, { useState, useContext, useEffect } from 'react';
import { TextField, Box, Grid, Card, Typography, createMuiTheme, ThemeProvider, CircularProgress } from '@material-ui/core';
import { ColorButton, useStyles, YellowSwitch } from './style';
import HomeworkService from '../../services/homeworkService';
import { UserContext } from '../../userContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from 'moment';

const modelHomework = {
    title: '',
    description: '',
    available: false,
    deadLine: moment()
}

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#d6a82a',
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: lightBlue.A200,
                // color: "white",
            },
        },
        MuiPickersDay: {
            day: {
                color: '#d6a82a',
            },
            daySelected: {
                backgroundColor: '#d6a82a',
            },
            current: {
                color: '#d6a82a',
            },
        },
        MuiButton: {
            textPrimary: {
                color: '#d6a82a',
            }
        }
    },
});

export default function NewHomework(props) {
    const classes = useStyles();

    const setSnackbar = props.setSnackbar;
    const getHomeworksTeacher = props.getHomeworksTeacher;

    const [homework, setHomework] = useState(modelHomework);
    const [switchCheck, setSwitchCheck] = useState(false);
    const [loading, setloading] = useState(false)

    const homeworkService = new HomeworkService();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user.modifyHomework) {
            let deadLine = moment(user.modifyHomework.deadLine, 'DD/MM/yyyy'); //TE ODIO

            setHomework({
                title: user.modifyHomework.title,
                description: user.modifyHomework.description,
                available: user.modifyHomework.available,
                deadLine: deadLine
            });

            setSwitchCheck(user.modifyHomework.available);

        }
    }, [user])

    const update = e => {
        setHomework({
            ...homework,
            [e.target.name]: e.target.value
        });
    }

    const changeDeadLine = (date) => {
        setHomework({
            ...homework,
            deadLine: date
        });
    }

    const sendHomework = () => {
        setloading(true)
        let classroomId = localStorage.getItem('classroomId');

        if (user.modifyHomework) {
            let homeworkModified = {};
            homeworkModified.title = homework.title;
            homeworkModified.description = homework.description;
            homeworkModified.available = switchCheck;
            homeworkModified.deadLine = homework.deadLine.format("DD/MM/yyyy");
            homeworkService.modifyHomework(homeworkModified, user.modifyHomework.id)
                .then(() => {
                    getHomeworksTeacher()
                    setloading(false)
                    setSnackbar({
                        open: true,
                        message: 'Tarea modificada exitosamente!',
                        severity: 'success'
                    });
                    setHomework(modelHomework);
                })
                .catch(() => {
                    setloading(false)
                    setSnackbar({
                        open: true,
                        message: 'error al subir la tarea', //TODO
                        severity: 'error'
                    })
                })
        } else {
            homeworkService.newHomework(homework, user.id, classroomId)
                .then(() => {
                    getHomeworksTeacher()
                    setloading(false)
                    setSnackbar({
                        open: true,
                        message: 'Nueva tarea agregada exitosamente!',
                        severity: 'success'
                    });
                    setHomework(modelHomework)
                })
                .catch(() => {
                    setloading(false)
                    setSnackbar({
                        open: true,
                        message: 'error al subir la tarea', //TODO
                        severity: 'error'
                    })
                })
        }
    }

    const cancel = () => {
        setUser({
            ...user,
            modifyHomework: null
        });
        setHomework(modelHomework);
        setSwitchCheck(false);
    };

    const handleChange = (event) => {
        setSwitchCheck(event.target.checked);
    };

    const formHasData = () => {
        return homework.description !== '' && homework.title !== '';
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box m={2}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <TextField variant="outlined" margin="normal" name="title" label="Titulo" id="title" value={homework.title} onChange={update}></TextField>
                        <TextField variant="outlined" margin="normal" name="description" label="Descripcion" id="description" multiline value={homework.description} onChange={update}></TextField>
                        <Typography>Disponible</Typography>
                        <YellowSwitch checked={switchCheck} onChange={handleChange} name="switchCheck"></YellowSwitch>
                        <ThemeProvider theme={materialTheme}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    clearable
                                    value={homework.deadLine}
                                    name="deadLine"
                                    placeholder="Fecha limite"
                                    onChange={changeDeadLine}
                                    minDate={moment()}
                                    format="DD/MM/yyyy"
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                        <Grid item >
                            <br/>
                            {loading ?
                                <CircularProgress style={{ color: '#636363' }} />
                                :
                                <span>
                                    <ColorButton className={classes.button} onClick={cancel} style={{ marginLeft: '10px' }}>Cancelar</ColorButton>
                                    <ColorButton className={classes.button} onClick={sendHomework} disabled={!formHasData()} >Subir</ColorButton>
                                </span>
                            }

                        </Grid>
                    </Grid>
                </Box>

            </Card>
        </div>
    )
}
