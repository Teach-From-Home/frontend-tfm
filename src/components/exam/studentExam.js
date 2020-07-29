import React from "react";
import ExamCard from "./examCard";
import { YellowTypography } from "./style";
import { Box } from "@material-ui/core";

export default function StudentExam({ exams, getExams }) {
  return (
    <div>
      {exams ? (
        exams.map((e) => {
          return (
            <Box m={1} key={e.id}>
              <ExamCard exam={e} />
            </Box>
          )
        })
      ) : (
        <YellowTypography>No hay examenes...</YellowTypography>
      )}
    </div>
  );
}
