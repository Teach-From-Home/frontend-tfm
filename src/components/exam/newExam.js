import React, { useState, useContext, useEffect } from "react";
import ADesarrollar from "./aDesarrollar";
import MultipleChoice from "./multipleChoice";
import {
  TextField,
  Box,
  Grid,
  Typography,
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
  Card,
} from "@material-ui/core";
import { ColorButton, useStyles, YellowSwitch } from "./style";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import MultipleChoiceStudent from "./multipleChoiceStudent";
import ADesarrollarStudent from "./aDesarrollarStudent";
import ExamService from "../../services/examService";
import { UserContext } from "../../userContext";
import { setLogLevel } from "firebase";

const modelExam = {
  title: "",
  description: "",
  available: false,
  deadLine: moment(),
  minutes: 0,
  questions: []
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
  const [switchCheck, setSwitchCheck] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const examService = new ExamService();

  useEffect(() => {
    if (user.modifyExam) {
      let deadLine = moment(user.modifyExam.deadLine, "DD/MM/yyyy"); //TE ODIO

      setExam({
        ...user.modifyExam,
        deadLine: deadLine,
      });

      setSwitchCheck(user.modifyExam.available);
    }else{
      setExam({...modelExam, questions: []});
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

  const handleChange = (event) => {
    setSwitchCheck(event.target.checked);
    setExam({
      ...exam,
      available: event.target.checked
    });
  };

  const sendExam = () => {
    let classroomId = localStorage.getItem("classroomId");

    try {
      let resp = examService.newExam(exam, classroomId).then((r) => {
        getExams();
        setExam({...modelExam, questions: []});
        setSnackbar({
          open: true,
          message: "Nuevo examen creado exitosamente.",
          severity: "success",
        });
      });
    } catch (error) {}
  };

  const editExam = () => {
    let classroomId = localStorage.getItem("classroomId");

    try {
      let resp = examService.editExam(exam).then((r) => {
        getExams();
        setExam({...modelExam, questions: []});
        setSnackbar({
          open: true,
          message: "Examen editado exitosamente.",
          severity: "success",
        });
      });
    } catch (error) {}
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
            <Typography>Disponible</Typography>
            <YellowSwitch
              checked={switchCheck}
              onChange={handleChange}
              name="switchCheck"
            ></YellowSwitch>
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
              InputProps={{
                inputProps: {
                  min: 1
                },
              }}
            />
            {user.modifyExam ? (
              <ColorButton onClick={editExam} style={{ marginTop: "10px" }}>
                Guardar cambios
              </ColorButton>
            ) : (
              <ColorButton onClick={sendExam} style={{ marginTop: "10px" }}>
                Enviar examen
              </ColorButton>
            )}
            <Box m={2}>
              <Grid>
                <ColorButton
                  onClick={() => setShowADesarrollar(!showADesarrollar)}
                >
                  Agregar pregunta a desarrollar
                </ColorButton>
                <ColorButton
                  onClick={() => setShowMultipleChoice(!showMultipleChoice)}
                  style={{ marginLeft: "5px" }}
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
        {console.log(exam.questions),
        exam.questions
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
