import React, { useState, useEffect } from "react";
import { ColorButton, ColorRadio, useStyles } from "../exam/style";
import {
  Card,
  Grid,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  CardHeader,
} from "@material-ui/core";

export default function MultipleChoiceStudent({ question, index, readOnly }) {
  const classes = useStyles();

  const [value, setValue] = useState('1');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    getOkAnswer();
  }, [])

  const getOkAnswer = () => {
    let ans = question.options.map((o, index) => {
        if(o.selected) return index;
    });

    setValue(ans.find(a => a !== undefined).toString())
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
          {
              readOnly ? 
              <ColorButton onClick={modifyMultipleChoice}>Modificar</ColorButton>
              :
              null
          }
        </Box>
      </Card>
    </div>
  );
}
