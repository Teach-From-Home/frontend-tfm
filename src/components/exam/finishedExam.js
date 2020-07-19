import React from "react";
import { Box } from "@material-ui/core";
import MultipleChoiceStudent from "./multipleChoiceStudent";
import ADesarrollarStudent from "./aDesarrollarStudent";

export default function FinishedExam({ exam }) {
  return (
    <div>
      {exam.answers
        ? exam.answers.map((q, i) => {
            return (
              <Box m={1} key={i}>
                {q.type === "choice" ? (
                  <MultipleChoiceStudent
                    question={q}
                    index={i}
                    readOnly
                    finished
                  />
                ) : (
                  <ADesarrollarStudent
                    question={q}
                    index={i}
                    readOnly
                    finished
                  />
                )}
              </Box>
            );
          },
          console.log(exam))
          
        : null}
    </div>
  );
}
