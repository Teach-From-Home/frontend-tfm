import React, { useState } from "react";
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
} from "@material-ui/core";
import { ColorButton, useStyles, YellowSwitch } from "./style";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import MultipleChoiceStudent from "./multipleChoiceStudent";
import ADesarrollarStudent from "./aDesarrollarStudent";
import ExamService from "../../services/examService";

const modelExam = {
  title: "",
  description: "",
  available: false,
  deadLine: moment(),
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

export default function Exam() {
  const [exam, setExam] = useState(modelExam);
  const [showMultipleChoice, setShowMultipleChoice] = useState(false);
  const [showADesarrollar, setShowADesarrollar] = useState(false);
  const [switchCheck, setSwitchCheck] = useState(false);

  const examService = new ExamService();

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
  };

  const sendExam = () => {
    let classroomId = localStorage.getItem("classroomId");

    try {
      let resp = examService.newExam(exam, classroomId).then((r) => {});
    } catch (error) {}
  };

  return (
    <div>
      <Box m={1}>
        <Grid container direction="column" justify="center" alignItems="center">
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
          <ColorButton onClick={sendExam} style={{ marginTop: "10px" }}>
            Enviar examen
          </ColorButton>
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
    </div>
  );
}
