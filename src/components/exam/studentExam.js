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
            <Box m={2}>
              <ExamCard exam={e} key={e.id} />
            </Box>
          )
        })
      ) : (
        <YellowTypography>No hay examenes...</YellowTypography>
      )}
    </div>
  );
}
