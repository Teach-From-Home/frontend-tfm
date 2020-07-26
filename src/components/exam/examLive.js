import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../userContext";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import SnackbarOpen from "../snackbar/snackbar";
import MultipleChoiceStudent from "./multipleChoiceStudent";
import ADesarrollarStudent from "./aDesarrollarStudent";
import { ColorButton } from "./style";
import ExamService from "../../services/examService";

export default function ExamLive() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [exam, setExam] = useState();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const examService = new ExamService();
  
  let resp = [];

  useEffect(() => {
    if (user.selectedExam) setExam(user.selectedExam);
    setUser({
      ...user,
      finishedExam: [],
    });
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

  const setRespp = (thing) => {
    resp = thing
  }

  const getRespp = () => {
    return resp
  }

  const finishExam = () => {
    try {
      examService.postExam(exam.id, user.id, resp).then(r => {
        setSnackbar({
          open: true,
          message: "Examen entregado.",
          severity: "success",
        })
        
      })
      .catch(e => {
        setSnackbar({
          open: true,
          message: "Error al entregar el examen.",
          severity: "error",
        })
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al entregar el examen.",
        severity: "error",
      })
      
    }

    setTimeout(() => {
      history.push("/exam");
    }, 2000);
  };

  return (
    <div>
      {exam
        ? exam.questions.map((q, i) => {
            return (
              <Box m={1} key={i} p={1}>
                {q.type === "choice" ? (
                  <MultipleChoiceStudent
                    question={q}
                    setRespp={setRespp}
                    getRespp={getRespp}
                    get resp
                    index={i}
                  />
                ) : (
                  <ADesarrollarStudent
                    question={q}
                    setRespp={setRespp}
                    getRespp={getRespp}
                    resp={resp}
                    index={i}
                  />
                )}
              </Box>
            );
          })
        : null}
      <ColorButton onClick={finishExam}>Terminar</ColorButton>
      <SnackbarOpen
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnac={closeSnackbar}
      />
    </div>
  );
}
