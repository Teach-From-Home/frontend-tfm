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
  const [isLoaded, setIsLoaded] = useState(false);
  const [homeworks, setHomeworks] = useState();
  const [homeworksDone, setHomeworksDone] = useState();
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
    if (!isLoaded) {
      try {
        let homeworks = await homeworkService.getHomework(
          user.id,
          user.selectedClassroom.id
        );
        setHomeworks(homeworks);
      } catch (err) {
        setSnackbar({
          open: true,
          message: "No hay tareas para subir",
          severity: "info",
        });
        setHomeworks([])
      }
      setIsLoaded(true);
    }
  };

  return (
    <div className={classes.asd}>
      {user.role === "STUDENT" ? (
        <div className={classes.backgroundImg}>
          {isLoaded ? (
            homeworks.map((h) => {
              return <HomeworkCard homework={h} key={h.id} />;
            })
          ) : (
            <CircularProgress />
          )}
        </div>
      ) : (
        <div>
          <TeacherCard setSnackbar={setSnackbar}></TeacherCard>
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
