import React, { useState, useEffect, useContext } from "react";
import { TextField, Box } from "@material-ui/core";
import { ColorButton } from "../exam/style";
import { UserContext } from "../../userContext";

export default function ADesarrollar({ setExam, exam, setShowADesarrollar }) {
  const [title, setTitle] = useState("");

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user.modifyADesarrollar) {
      setTitle(user.modifyADesarrollar.title);

      let qs = exam.questions.filter((q) => {
        return q !== user.modifyADesarrollar;
      });

      setExam({
        ...exam,
        questions: qs,
      });

      setUser({
        ...user,
        modifyADesarrollar: null,
      });
    } else {
    }
  }, []);

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
        <ColorButton onClick={finishQuestion}>Agregar pregunta</ColorButton>
      </Box>
    </div>
  );
}
