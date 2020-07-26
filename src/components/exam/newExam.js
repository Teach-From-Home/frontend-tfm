import React, { useState, useContext, useEffect } from "react";
import ADesarrollar from "./aDesarrollar";
import MultipleChoice from "./multipleChoice";
import {
  TextField,
  Box,
  Grid,
  createMuiTheme,
  ThemeProvider,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { ColorButton, useStyles } from "./style";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import MultipleChoiceStudent from "./multipleChoiceStudent";
import ADesarrollarStudent from "./aDesarrollarStudent";
import ExamService from "../../services/examService";
import { UserContext } from "../../userContext";

const modelExam = {
  title: "",
  description: "",
  available: false,
  deadLine: moment(),
  minutes: 0,
  questions: [],
};

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#d6a82a",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#d6a82a",
      },
      daySelected: {
        backgroundColor: "#d6a82a",
      },
      current: {
        color: "#d6a82a",
      },
    },
    MuiButton: {
      textPrimary: {
        color: "#d6a82a",
      },
    },
  },
});

export default function NewExam({ getExams, setSnackbar }) {
  const classes = useStyles();
  const [exam, setExam] = useState(modelExam);
  const [showMultipleChoice, setShowMultipleChoice] = useState(false);
  const [showADesarrollar, setShowADesarrollar] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const examService = new ExamService();

  useEffect(() => {
    if (user.modifyExam) {
      let deadLine = moment(user.modifyExam.deadLine, "DD/MM/yyyy"); //TE ODIO

      setExam({
        ...user.modifyExam,
        deadLine: deadLine,
      });
    } else {
      setExam({ ...modelExam, questions: [] });
    }
  }, [user]);

  const update = (e) => {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
  };

  const changeDeadLine = (date) => {
    setExam({
      ...exam,
      deadLine: date,
    });
  };

  const sendExam = () => {
    setLoading(true);
    let classroomId = localStorage.getItem("classroomId");

    try {
      examService.newExam(exam, classroomId).then((r) => {
        getExams();
        setExam({ ...modelExam, questions: [] });
        setSnackbar({
          open: true,
          message: "Nuevo examen creado exitosamente.",
          severity: "success",
        });
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const editExam = () => {
    setLoading(true);
    try {
      examService.editExam(exam).then((r) => {
        getExams();
        setExam({ ...modelExam, questions: [] });
        setSnackbar({
          open: true,
          message: "Examen editado exitosamente.",
          severity: "success",
        });
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const cleanData = () => {
    setExam({ ...modelExam, questions: [] });
  };

  const hasData = () => {
    return !(
      exam.questions.length !== 0 &&
      exam.title !== "" &&
      exam.description !== "" &&
      exam.minutes > 0
    );
  };

  return (
    <div className={classes.root}>
      <Card className={classes.searchCard}>
        <Box m={1}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <TextField
              variant="outlined"
              margin="normal"
              name="title"
              label="Titulo"
              value={exam.title}
              onChange={update}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              name="description"
              label="Descripcion"
              id="description"
              multiline
              value={exam.description}
              onChange={update}
            ></TextField>
            <ThemeProvider theme={materialTheme}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  clearable
                  value={exam.deadLine}
                  name="deadLine"
                  placeholder="Fecha limite"
                  onChange={changeDeadLine}
                  minDate={moment()}
                  format="DD/MM/yyyy"
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
            <TextField
              label="Minutos"
              type="number"
              name="minutes"
              value={exam.minutes}
              onChange={update}
              style={{ marginTop: "5px" }}
              InputProps={{
                inputProps: {
                  min: 1,
                },
              }}
            />
            <ColorButton onClick={cleanData} style={{ marginTop: "10px" }}>
              Limpiar campos
            </ColorButton>
            {loading ? (
              <CircularProgress
                size={50}
                style={{ color: "#636363", marginTop: "5px" }}
              />
            ) : (
              <span>
                {user.modifyExam ? (
                  <ColorButton onClick={editExam} style={{ marginTop: "10px" }}>
                    Guardar cambios
                  </ColorButton>
                ) : (
                  <ColorButton
                    onClick={sendExam}
                    style={{ marginTop: "10px" }}
                    disabled={hasData()}
                  >
                    Enviar examen
                  </ColorButton>
                )}
              </span>
            )}

            <Box m={2}>
              <Grid>
                <ColorButton
                  onClick={() => setShowADesarrollar(!showADesarrollar)}
                  style={{ marginLeft: "5px", marginTop: "5px" }}
                >
                  Agregar pregunta a desarrollar
                </ColorButton>
                <ColorButton
                  onClick={() => setShowMultipleChoice(!showMultipleChoice)}
                  style={{ marginLeft: "5px", marginTop: "5px" }}
                >
                  Agregar pregunta multiple choice
                </ColorButton>
              </Grid>
            </Box>
          </Grid>
        </Box>
        {showMultipleChoice ? (
          <MultipleChoice
            setExam={setExam}
            exam={exam}
            setShowMultipleChoice={setShowMultipleChoice}
          ></MultipleChoice>
        ) : null}
        {showADesarrollar ? (
          <ADesarrollar
            setExam={setExam}
            exam={exam}
            setShowADesarrollar={setShowADesarrollar}
          ></ADesarrollar>
        ) : null}
        {exam.questions
          ? exam.questions.map((q, i) => {
              return (
                <Box m={1} key={i}>
                  {q.type === "choice" ? (
                    <MultipleChoiceStudent
                      question={q}
                      index={i}
                      setShowMultipleChoice={setShowMultipleChoice}
                      readOnly
                    />
                  ) : (
                    <ADesarrollarStudent
                      question={q}
                      index={i}
                      setShowADesarrollar={setShowADesarrollar}
                      readOnly
                    />
                  )}
                </Box>
              );
            })
          : null}
      </Card>
    </div>
  );
}
