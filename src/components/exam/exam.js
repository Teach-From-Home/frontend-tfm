import React, { useState, useEffect, Fragment } from "react";
import TeacherExam from "./teacherExam";
import SnackbarOpen from "../snackbar/snackbar";
import ExamService from "../../services/examService";

export default function Exam() {
  const [exams, setExams] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
        message: "No hay tareas para mostar",
        severity: "info",
      });
      setExams([]);
    }
  };

  return (
    <Fragment>
      <TeacherExam exams={exams}></TeacherExam>
      <SnackbarOpen
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnac={closeSnackbar}
      />
    </Fragment>
  );
}
