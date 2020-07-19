import React, { useEffect, useContext, useState } from 'react'
import { Grid, Box, CircularProgress, Typography } from '@material-ui/core'
import { UserContext } from '../../userContext';
import StudentsExamCard from './studentsExamCard';
import SnackbarOpen from "../snackbar/snackbar";
import ExamService from '../../services/examService';

export default function StudentsExam(props) {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const { user } = useContext(UserContext);

    const examService = new ExamService();

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
        getStudentsExams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStudentsExams = async () => {
        setLoading(true)
        examService.getStudentsExams(user.selectedExam.id)
            .then((exs) => {
                setLoading(false)
                setExams(exs);
            })
            .catch(() => setLoading(false))
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
                            {exams.map((e, index) => {
                                return (
                                    <Box m={2}>
                                        <StudentsExamCard setSnackbar={setSnackbar} exam={e} key={index} />
                                    </Box>
                                )
                            })}
                            {exams.length === 0 ?
                                <Typography variant="h2" style={{ color: '#636363', marginTop: '100px' }} > No hay examenes subidos por los alumnos</Typography>

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
