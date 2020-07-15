import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Typography,
  TextField,
  CardHeader,
  Box,
} from "@material-ui/core";
import { UserContext } from "../../userContext";
import { useStyles, ColorButton } from "./style";

export default function ADesarrollarStudent({
  question,
  index,
  setShowADesarrollar,
  readOnly,
}) {
  const classes = useStyles();
  const [answer, setAnswer] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    createAnswer();
  }, [answer]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAnswer({ ...answer, [name]: value });
  };

  const fillADesarrollar = () => {
    setUser({
      ...user,
      modifyADesarrollar: question,
    });
    setShowADesarrollar(true);
  };

  const createAnswer = () => {
    if (user.role === "STUDENT") {
      let ans = {
        type: "write",
        title: question.title,
        answer: answer,
      };

      let eQuestions = user.finishedExam;

      eQuestions.push(ans);

      setUser({
        ...user,
        finishedExam: eQuestions,
      });
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.searchCard}>
        <CardHeader title={`${index + 1}. ${question.title}`} />
        <Box m={2}>
          {user.role === "STUDENT" ? (
            <TextField
              label="Escribe tu respuesta..."
              answer
              rowsMax={50}
              variant="outlined"
              name="text"
              onChange={handleInputChange}
              value={answer.text}
            />
          ) : (
            <ColorButton onClick={fillADesarrollar}>Modificar</ColorButton>
          )}
        </Box>
      </Card>
    </div>
  );
}
