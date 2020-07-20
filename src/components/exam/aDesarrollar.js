import React, { useState, useEffect, useContext } from "react";
import { TextField, Box } from "@material-ui/core";
import { ColorButton } from "../exam/style";
import { UserContext } from "../../userContext";

export default function ADesarrollar({ setExam, exam, setShowADesarrollar }) {
  const [title, setTitle] = useState("");

  const [prev, setPrev] = useState("");

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("modifyADesarrollar"));
    if (a) {
      setTitle(a.title);
      setPrev(a);
    } else {
      setTitle('');
      setPrev('');
    }
  }, []);

  const finishQuestion = () => {
    let questionObj = {
      type: "write",
      title: title,
    };

    if (prev) {
      let qs = exam.questions.map((q) => {
        if (q.title == prev.title && prev.type == q.type) {
          return questionObj;
        } else {
          return q;
        }
      });

      setExam({
        ...exam,
        questions: qs,
      });

      localStorage.setItem("modifyADesarrollar", null);
    }else{
      let qs = exam.questions;

      qs.push(questionObj);

      setExam({
        ...exam,
        questions: [...qs],
      });
    }

    setTitle('');
    setPrev('');
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
