import React, { useState } from "react";
import {
  TextField,
  Box,
  Grid,
} from "@material-ui/core";
import { ColorButton, ColorRadio } from "../exam/style";
import Exam from "./exam";

const modelOpcion = {
  selected: false,
  question: "",
};

const modelQuestion = {
  title: '',
  type: 'choice',
  questions: []
}

export default function MultipleChoice({setExam, exam}) {
  const [selectedValue, setSelectedValue] = useState();
  const [question, setQuestion] = useState(modelQuestion);
  const [opcion1, setOpcion1] = useState(modelOpcion);
  const [opcion2, setOpcion2] = useState(modelOpcion);
  const [opcion3, setOpcion3] = useState(modelOpcion);
  const [opcion4, setOpcion4] = useState(modelOpcion);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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

  const update = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
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
    let questions = [opcion1, opcion2, opcion3, opcion4]; 
    
    setQuestion({
      ...question,
      questions: questions
    });  


    //!Medio chanchullo pero por ahora es lo q se me ocurrio. NO ESTOY ORGULLOSO
    let eQuestions = exam.questions

    eQuestions.push(question);

    setExam({
      ...exam,
      questions: eQuestions
    })

  };

  return (
    <div>
      <TextField variant="outlined"
            margin="normal"
            name="title"
            label="Titulo"
            value={question.title}
            onChange={update}
            style={{ width: '290px' }}>
            </TextField>
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
              style={{ width: '250px' }}
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
              style={{ width: '250px' }}
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
              style={{ width: '250px' }}
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
              style={{ width: '250px' }}
            ></TextField>
          </Grid>
          <ColorButton onClick={finishQuestion}>Terminar</ColorButton>
        </Grid>
      </Box>
    </div>
  );
}
