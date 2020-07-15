import React from "react";
import ExamCard from "./examCard";
import { YellowTypography } from "./style";

export default function StudentExam({ exams, getExams }) {
  return (
    <div>
      {exams ? (
        exams.map((e) => {
          return <ExamCard exam={e} key={e.id} />;
        })
      ) : (
        <YellowTypography>No hay examenes...</YellowTypography>
      )}
    </div>
  );
}
