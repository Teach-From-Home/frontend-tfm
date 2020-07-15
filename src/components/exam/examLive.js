import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../userContext";
import moment from "moment";
import { Box } from "@material-ui/core";
import MultipleChoiceStudent from "./multipleChoiceStudent";
import ADesarrollarStudent from "./aDesarrollarStudent";
import { ColorButton } from "./style";

const modelExam = {
  id: "",
  title: "",
  description: "",
  deadLine: moment(),
  questions: [],
};

export default function ExamLive() {
  const { user, setUser } = useContext(UserContext);
  const [exam, setExam] = useState();

  useEffect(() => {
    if (user.selectedExam) setExam(user.selectedExam);
    setUser({
      ...user,
      finishedExam: [],
    });
  }, []);

  const finishExam = () => {
    let e = exam;
  };

  return (
    <div>
      {exam
        ? exam.questions.map((q, i) => {
            return (
              <Box m={1} key={i}>
                {q.type === "choice" ? (
                  <MultipleChoiceStudent
                    question={q}
                    index={i}
                  />
                ) : (
                  <ADesarrollarStudent
                    question={q}
                    index={i}
                  />
                )}
              </Box>
            );
          })
        : null}
      <ColorButton onClick={finishExam}>Terminar</ColorButton>
    </div>
  );
}
