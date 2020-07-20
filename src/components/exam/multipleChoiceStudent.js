import React, { useState, useEffect, useContext, useRef } from "react";
import { ColorButton, ColorRadio, useStyles, YellowTypography } from "../exam/style";
import {
  Card,
  Grid,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  CardHeader,
  Typography,
  TextField,
} from "@material-ui/core";
import { UserContext } from "../../userContext";
import _ from 'lodash';

export default function MultipleChoiceStudent({
  question,
  index,
  setShowMultipleChoice,
  readOnly,
  getRespp,
  setRespp,
  finished
}) {
  const classes = useStyles();

  const [value, setValue] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleChange = (event) => {
    clearTrueDataFromOptions(); //pongo todas en false 
    setValue(event.target.value);
    selectThisOne(event.target.value); //selecciono la q toco
  };

  useEffect(() => {
    getOkAnswer();
    if(value){
      debounceSearch.current(value);
    }
  }, [value, question]);

  const getOkAnswer = () => {
    if (user.role === "TEACHER" || finished) {
      let ans = question.options.map((o, index) => {
        if (o.selected) return index;
      });

      setValue(ans.find((a) => a !== undefined).toString());
    }
  };

  const fillModifyMultipleChoice = () => {
    /*setUser({
      ...user,
      modifyMultipleChoice: question,
    });*/
    localStorage.setItem('modifyMultipleChoice', JSON.stringify(question))
    setShowMultipleChoice(true);
  };

  const createAnswer = (answer) => {
    if (user.role === "STUDENT" && !finished) {
      if(answer === '') return;

      let resp = getRespp();

      //filtro las questions y saco la que es igual a la q estoy tocando ahora.
      let qs = resp.filter(q => q.title !== question.title)

      //a las que me quedaron, les pusheo la nueva asi 'piso' la vieja.
      qs.push(question);

      setRespp(qs);
    }
  };

  const debounceSearch = useRef(
    _.debounce(answer => {
      createAnswer(answer);
    }, 1500)
  )

  const clearTrueDataFromOptions = () => {
    question.options.forEach(q => { q.selected = false});
  }

  const selectThisOne = (index) => {
    question.options[parseInt(index)].selected = true;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.searchCard}>
        <CardHeader title={`${index + 1}. ${question.title}`} />
        <Box m={2}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <FormControl component="fieldset">
              <RadioGroup value={value} onChange={handleChange}>
                <FormControlLabel
                  value="0"
                  control={<ColorRadio />}
                  label={question.options[0].question}
                  disabled={readOnly}
                />
                <FormControlLabel
                  value="1"
                  control={<ColorRadio />}
                  label={question.options[1].question}
                  disabled={readOnly}
                />
                <FormControlLabel
                  value="2"
                  control={<ColorRadio />}
                  label={question.options[2].question}
                  disabled={readOnly}
                />
                <FormControlLabel
                  value="3"
                  control={<ColorRadio />}
                  label={question.options[3].question}
                  disabled={readOnly}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {readOnly && !finished ? (
            <ColorButton onClick={fillModifyMultipleChoice}>
              Modificar
            </ColorButton>
          ) :
          readOnly ?
          <YellowTypography>{question.validAnswer}</YellowTypography>
          :
          null
        }
        </Box>
      </Card>
    </div>
  );
}
