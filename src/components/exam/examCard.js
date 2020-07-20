import React, { useContext, useState } from "react";
import { Typography, Grid, Card, Box } from "@material-ui/core";
import { useStyles, ColorButton, YellowTypography } from "./style";
import AvatarWithName from "../avatarWithName";
import { UserContext } from "../../userContext";
import { useHistory } from "react-router-dom";
import ExamService from "../../services/examService";
import FinishedExam from "./finishedExam";

const modelExam = {
  title: "",
  nose: "",
};

export default function ExamCard({ exam, teacher }) {
  const classes = useStyles();
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);
  const [showFinishedExam, setShowFinishedExam] = useState(false);

  const examService = new ExamService();

  const redirectStudentExam = () => {
    setUser({
      ...user,
      selectedExam: exam,
    });
    history.push("/studentsExam");
  };

  const fillModifyExam = () => {
    setUser({
      ...user,
      modifyExam: exam,
    });
  };

  const redirectDoExam = () => {
    setUser({
      ...user,
      selectedExam: exam,
    });
    history.push("/examLive");
    examService.startExam(exam.id, user.id);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Box m={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YellowTypography variant="h6">{exam.title}</YellowTypography>
              {teacher ? (
                <span>
                  {exam.available ? (
                    <Typography variant="caption">Activo</Typography>
                  ) : (
                    <Typography variant="caption" style={{ color: "red" }}>
                      Inactivo
                    </Typography>
                  )}
                </span>
              ) : (
                ""
              )}
              <Typography variant="body1">{exam.description}</Typography>
              <Typography variant="body1">{`Fecha del examen: ${exam.deadLine}`}</Typography>

              {exam.uploaded &&
              exam.uploadedExam.grade &&
              exam.uploadedExam.teacherComment ? (
                <span>
                  <YellowTypography>{`Nota: ${exam.uploadedExam.grade}`}</YellowTypography>
                  <YellowTypography>{`Comentario: ${exam.uploadedExam.teacherComment}`}</YellowTypography>
                </span>
              ) : (
                <YellowTypography>
                  {user.role === 'STUDENT' ? "Aun no ha sido corregido su examen." : ""}
                </YellowTypography>
              )}

              {user.role === "STUDENT" ? (
                <div>
                  {exam.uploaded ? (
                    <ColorButton
                      onClick={() => {
                        setShowFinishedExam(!showFinishedExam);
                      }}
                    >
                      Ver examen
                    </ColorButton>
                  ) : (
                    <ColorButton onClick={redirectDoExam}>Entrar</ColorButton>
                  )}
                </div>
              ) : (
                <div>
                  <Box m={2}>
                    <ColorButton
                      className={classes.button}
                      onClick={fillModifyExam}
                      style={{ marginLeft: "10px" }}
                    >
                      modificar
                    </ColorButton>
                    <ColorButton
                      className={classes.button}
                      onClick={redirectStudentExam}
                    >
                      ver
                    </ColorButton>
                  </Box>
                </div>
              )}
              {showFinishedExam ? (
                <FinishedExam exam={exam.uploadedExam} />
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}
