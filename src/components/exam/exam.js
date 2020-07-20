import React, { useState, useEffect, Fragment, useContext } from "react";
import TeacherExam from "./teacherExam";
import SnackbarOpen from "../snackbar/snackbar";
import ExamService from "../../services/examService";
import { UserContext } from "../../userContext";
import StudentExam from "./studentExam";

export default function Exam() {
  const [exams, setExams] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { user, setUser } = useContext(UserContext);

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
    let userId = localStorage.getItem("userId");
    let classroomId = localStorage.getItem("classroomId");

    try {
      let exams = await examService.getExam(userId, classroomId);
      setExams(exams);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "No hay examenes para mostrar",
        severity: "info",
      });
      setExams([]);
    }
  };

  return (
    <Fragment>
      {user.role === "STUDENT" ? (
        <StudentExam exams={exams} getExams={getExams} />
      ) : (
        <TeacherExam exams={exams} getExams={getExams} />
      )}
      <SnackbarOpen
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnac={closeSnackbar}
      />
    </Fragment>
  );
}
