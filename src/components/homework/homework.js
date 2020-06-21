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
  const { user, setUser } = useContext(UserContext);
  const [homeworks, setHomeworks] = useState();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const homeworkService = new HomeworkService();

  useEffect(() => {
    getHomeworks();
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
      try {
        let homeworks = await homeworkService.getHomework(
          user.id,
          user.selectedClassroom.id
        );
        setHomeworks(homeworks);
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Error al cargar las tarear intente nuevamente",
          severity: "info",
        });
        setHomeworks([])
      }
  };

  return (
    <div className={classes.asd}>
      {user.role === "STUDENT" ? (
        <div className={classes.backgroundImg}>
          {homeworks ? (
            homeworks.map((h) => {
              return <HomeworkCard callb={getHomeworks} homework={h} key={h.id} />;
            })
          ) : (
            <CircularProgress />
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
