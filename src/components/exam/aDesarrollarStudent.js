import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Card,
  Typography,
  TextField,
  CardHeader,
  Box,
} from "@material-ui/core";
import { UserContext } from "../../userContext";
import { useStyles, ColorButton, YellowTypography } from "./style";
import _ from 'lodash';

export default function ADesarrollarStudent({
  question,
  index,
  setShowADesarrollar,
  readOnly,
  getRespp,
  setRespp,
  finished
}) {
  const classes = useStyles();
  const [answer, setAnswer] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if(answer && !readOnly && !finished){
      debounceSearch.current(answer);
    }
  }, [answer]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAnswer({ ...answer, [name]: value });
  };

  const fillADesarrollar = () => {
    /*setUser({
      ...user,
      modifyADesarrollar: question,
    });*/
    localStorage.setItem('modifyADesarrollar', JSON.stringify(question))
    setShowADesarrollar(true);
  };

  const createAnswer = (answer) => {
    if (user.role === "STUDENT") {
      if(answer.text === '') return;
      let ans = {
        type: "write",
        title: question.title,
        answer: answer.text,
      };

      let resp = getRespp();

      //filtro las questions y saco la que es igual a la q estoy tocando ahora.
      let qs = resp.filter(q => q.title !== ans.title)

      //a las que me quedaron, les pusheo la nueva asi 'piso' la vieja.
      qs.push(ans);

      setRespp(qs);
    }
  };

  const debounceSearch = useRef(
    _.debounce(answer => {
      createAnswer(answer);
    }, 1500)
  )

  return (
    <div className={classes.root}>
      <Card className={classes.searchCard}>
        <CardHeader title={`${index + 1}. ${question.title}`} />
        <Box m={2}>
          {user.role === "STUDENT" && !finished ? (
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
            !finished ? 
            <ColorButton onClick={fillADesarrollar}>Modificar</ColorButton>
            :
            <YellowTypography>{question.answer}</YellowTypography>
          )}
        </Box>
      </Card>
    </div>
  );
}
