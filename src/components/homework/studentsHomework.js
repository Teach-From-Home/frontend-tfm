import React, { useEffect, useContext, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { UserContext } from '../../userContext';
import HomeworkService from '../../services/homeworkService';
import StudentsHomeworkCard from './studentsHomeworkCard';
import SnackbarOpen from "../snackbar/snackbar";

export default function StudentsHomework() {

    const [homeworks, setHomeworks] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    
    const {user} = useContext(UserContext);

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
                            return (
                                <Box m={2}>
                                    <StudentsHomeworkCard setSnackbar={setSnackbar} homework={h} key={h.id}/>
                                </Box>
                            )
                        })
                        :
                        <div></div>
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
