import React, { useState, useEffect, Fragment, useContext } from "react";
import TeacherExam from "./teacherExam";
import SnackbarOpen from "../snackbar/snackbar";
import ExamService from "../../services/examService";
import { UserContext } from "../../userContext";
import StudentExam from "./studentExam";
import { useStyles } from "./style";

export default function Exam() {
  const classes = useStyles();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
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
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getExams = async () => {
    setLoading(true)
    let userId = localStorage.getItem("userId");
    let classroomId = localStorage.getItem("classroomId");

    try {
      let exams = await examService.getExam(userId, classroomId);
      setLoading(false)
      setExams(exams);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "No hay examenes para mostrar",
        severity: "info",
      });
      setExams([]);
      setLoading(false)
    }
  };

  return (
    <Fragment>
      <div className={classes.backgroundImg}>
      {user.role === "STUDENT" ? (
        <StudentExam exams={exams} getExams={getExams} />
      ) : (
        <TeacherExam exams={exams} getExams={getExams} setSnackbar={setSnackbar} loading={loading}/>
      )}
      <SnackbarOpen
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnac={closeSnackbar}
      />
      </div>
    </Fragment>
  );
}
