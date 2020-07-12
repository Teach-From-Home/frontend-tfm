import React, { useState } from "react";
import { TextField, Box } from "@material-ui/core";
import { ColorButton } from "../exam/style";

export default function ADesarrollar({ setExam, exam, setShowADesarrollar }) {
  const [title, setTitle] = useState("");

  const finishQuestion = () => {
    let questionObj = {
      type: "write",
      title: title,
    };

    let eQuestions = exam.questions;

    eQuestions.push(questionObj);

    setExam({
      ...exam,
      questions: eQuestions,
    });

    setShowADesarrollar(false);
  };

  return (
    <div>
      <Box m={2}>
        <TextField
          label="Pregunta"
          style={{ width: "290px" }}
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
        <ColorButton onClick={finishQuestion}>Agregar pregunta</ColorButton>
      </Box>
    </div>
  );
}
