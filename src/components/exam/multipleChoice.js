import React, { useState } from "react";
import { TextField, Box, Grid } from "@material-ui/core";
import { ColorButton, ColorRadio } from "../exam/style";

const modelOpcion = {
  selected: false,
  question: "",
};

export default function MultipleChoice({
  setExam,
  exam,
  setShowMultipleChoice,
}) {
  const [selectedValue, setSelectedValue] = useState();
  const [title, setTitle] = useState("");
  const [opcion1, setOpcion1] = useState(modelOpcion);
  const [opcion2, setOpcion2] = useState(modelOpcion);
  const [opcion3, setOpcion3] = useState(modelOpcion);
  const [opcion4, setOpcion4] = useState(modelOpcion);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setOpcion1({
      ...opcion1,
      selected: false,
    });
    setOpcion2({
      ...opcion2,
      selected: false,
    });
    setOpcion3({
      ...opcion3,
      selected: false,
    });
    setOpcion4({
      ...opcion4,
      selected: false,
    });
    if (event.target.value === "1") {
      setOpcion1({
        ...opcion1,
        selected: true,
      });
    } else if (event.target.value === "2") {
      setOpcion2({
        ...opcion2,
        selected: true,
      });
    } else if (event.target.value === "3") {
      setOpcion3({
        ...opcion3,
        selected: true,
      });
    } else if (event.target.value === "4") {
      setOpcion4({
        ...opcion4,
        selected: true,
      });
    }
  };

  const update1 = (e) => {
    setOpcion1({
      ...opcion1,
      [e.target.name]: e.target.value,
    });
  };

  const update2 = (e) => {
    setOpcion2({
      ...opcion2,
      [e.target.name]: e.target.value,
    });
  };

  const update3 = (e) => {
    setOpcion3({
      ...opcion3,
      [e.target.name]: e.target.value,
    });
  };

  const update4 = (e) => {
    setOpcion4({
      ...opcion4,
      [e.target.name]: e.target.value,
    });
  };

  const finishQuestion = () => {
    //!Medio chanchullo pero por ahora es lo q se me ocurrio. NO ESTOY ORGULLOSO
    let questionObj = {
      title: title,
      type: "choice",
      options: [opcion1, opcion2, opcion3, opcion4],
    };

    let eQuestions = exam.questions;

    eQuestions.push(questionObj);

    setExam({
      ...exam,
      questions: eQuestions,
    });

    setShowMultipleChoice(false);
  };

  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        name="title"
        label="Titulo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "290px" }}
      ></TextField>
      <Box m={2}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <ColorRadio
              checked={selectedValue === "1"}
              onChange={handleChange}
              value="1"
              name="radio-button-demo"
            />
            <TextField
              name="question"
              onChange={update1}
              value={opcion1.question}
              style={{ width: "250px" }}
            ></TextField>
          </Grid>
          <Grid item>
            <ColorRadio
              checked={selectedValue === "2"}
              onChange={handleChange}
              value="2"
              name="radio-button-demo"
            />
            <TextField
              name="question"
              onChange={update2}
              value={opcion2.question}
              style={{ width: "250px" }}
            ></TextField>
          </Grid>
          <Grid item>
            <ColorRadio
              checked={selectedValue === "3"}
              onChange={handleChange}
              value="3"
              name="radio-button-demo"
            />
            <TextField
              name="question"
              onChange={update3}
              value={opcion3.question}
              style={{ width: "250px" }}
            ></TextField>
          </Grid>
          <Grid item>
            <ColorRadio
              checked={selectedValue === "4"}
              onChange={handleChange}
              value="4"
              name="radio-button-demo"
            />
            <TextField
              name="question"
              onChange={update4}
              value={opcion4.question}
              style={{ width: "250px" }}
            ></TextField>
          </Grid>
          <ColorButton onClick={finishQuestion}>Terminar</ColorButton>
        </Grid>
      </Box>
    </div>
  );
}
