import React, { useState, useEffect, useContext } from "react";
import { ColorButton, ColorRadio, useStyles } from "../exam/style";
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

export default function MultipleChoiceStudent({ question, index, setShowMultipleChoice, readOnly }) {
  const classes = useStyles();

  const [value, setValue] = useState("1");

  const { user, setUser } = useContext(UserContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    getOkAnswer();
  }, []);

  const getOkAnswer = () => {
    let ans = question.options.map((o, index) => {
      if (o.selected) return index;
    });

    setValue(ans.find((a) => a !== undefined).toString());
  };

  const fillModifyMultipleChoice = () => {
    setUser({
      ...user,
      modifyMultipleChoice: question
    });
    setShowMultipleChoice(true);
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
          {readOnly ? (
            <ColorButton onClick={fillModifyMultipleChoice}>Modificar</ColorButton>
          ) 
          : null}
        </Box>
      </Card>
    </div>
  );
}
