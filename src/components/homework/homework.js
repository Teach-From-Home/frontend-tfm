import React, { useContext, useEffect, useState } from "react";
import HomeworkCard from "./homeworkCard";
import { UserContext } from "../../userContext";
import TeacherCard from "./teacherCard";
import { useStyles } from "./style";
import HomeworkService from "../../services/homeworkService";
import SnackbarOpen from "../snackbar/snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Homework() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [homeworks, setHomeworks] = useState();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const homeworkService = new HomeworkService();

  useEffect(() => {
    getHomeworks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const getHomeworks = async () => {
    
    let userId = localStorage.getItem('userId');
    let classroomId = localStorage.getItem('classroomId');

    try {
      let homeworks = await homeworkService.getHomework(
        userId,
        classroomId
      );
      setHomeworks(homeworks);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "No hay tareas para mostar",
        severity: "info",
      });
      setHomeworks([])
    }
  };

  return (
    <div>
      {user.role === "STUDENT" ? (
        <div className={classes.backgroundImg}>
          {homeworks ? (
            homeworks.map((h) => {
              return <HomeworkCard callb={getHomeworks} homework={h} key={h.id} />;
            })
          ) : (
            <CircularProgress size={100} style={{color:'#d6a82a', marginTop: '300px'}}/>
          )}
        </div>
      ) : (
        <div>
          <TeacherCard setSnackbar={setSnackbar} getHomeworks={getHomeworks}></TeacherCard>
        </div>
      )}
      <SnackbarOpen
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnac={closeSnackbar}
      />
    </div>
  );
}
