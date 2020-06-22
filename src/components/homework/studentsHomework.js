import React, { useEffect, useContext, useState } from 'react'
import { Grid, Box, CircularProgress, Typography } from '@material-ui/core'
import { UserContext } from '../../userContext';
import HomeworkService from '../../services/homeworkService';
import StudentsHomeworkCard from './studentsHomeworkCard';
import SnackbarOpen from "../snackbar/snackbar";

export default function StudentsHomework() {

    const [homeworks, setHomeworks] = useState([]);
    const [loading, setloading] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const { user } = useContext(UserContext);

    const homeworkService = new HomeworkService();

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };

    useEffect(() => {
        getStudentsHomework();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStudentsHomework = async () => {
        setloading(true)
        homeworkService.getStudentsHomework(user.selectedHomework.id, user.id)
            .then((hs) => {
                setloading(false)
                setHomeworks(hs);
            })
            .catch(() => setloading(false))

    }

    return (
        <div>
            <Grid 
            direction='column' 
            alignItems='center' 
            justify='center'
            container>
                {
                    !loading ?
                        <span>
                            {homeworks.map(h => {
                                return (
                                    <Box m={2}>
                                        <StudentsHomeworkCard setSnackbar={setSnackbar} homework={h} key={h.id} />
                                    </Box>
                                )
                            })}
                            {homeworks.length === 0 ?
                                <Typography variant="h2" style={{ color: '#636363', marginTop: '100px' }} > No hay tareas subidas por los alumnos</Typography>

                                : ""}
                        </span>
                        :
                        <CircularProgress size={100} style={{ color: '#636363', marginTop: '100px' }} />
                }
            </Grid>
            <SnackbarOpen
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                closeSnac={closeSnackbar}
            />
        </div>
    )
}
