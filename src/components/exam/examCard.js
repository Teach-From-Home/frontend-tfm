import React, { useContext, useState } from "react";
import { Typography, Grid, Card, Box } from "@material-ui/core";
import { useStyles, ColorButton, YellowTypography } from "./style";
import { UserContext } from "../../userContext";
import { useHistory } from "react-router-dom";
import ExamService from "../../services/examService";
import FinishedExam from "./finishedExam";

export default function ExamCard({ exam, teacher, getExams }) {
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
    if(!exam.uploaded) examService.startExam(exam.id, user.id)
  };

  const activateExam = () => {
    examService.activateExam(user.selectedClassroom.id, exam.id).then(() => {
      getExams();
    })
  }

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
              <Typography variant="body1">{`Minutos para resolver: ${exam.minutes}`}</Typography>
              {exam.uploaded &&
              exam.uploadedExam.grade &&
              exam.uploadedExam.teacherComment ? (
                <span>
                  <YellowTypography>{`Nota: ${exam.uploadedExam.grade}`}</YellowTypography>
                  <YellowTypography>{`Comentario: ${exam.uploadedExam.teacherComment}`}</YellowTypography>
                </span>
              ) : (
                <YellowTypography>
                  {user.role === 'STUDENT' && exam.uploaded? "Aun no ha sido corregido su examen." : ""}
                </YellowTypography>
              )}
              {user.role === "STUDENT" ? (
                <div>
                  {exam.uploaded && !exam.uploadedExam.examIsInprogress? (
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
                    >
                      modificar
                    </ColorButton>
                    <ColorButton
                      className={classes.button}
                      onClick={redirectStudentExam}
                      style={{marginLeft: '10px'}}
                    >
                      ver
                    </ColorButton>
                    {
                      exam.available ? 
                      <ColorButton
                        className={classes.button}
                        onClick={activateExam}
                        style={{marginLeft: '10px'}}
                      >
                        desactivar
                      </ColorButton>
                      :
                      <ColorButton
                        className={classes.button}
                        onClick={activateExam}
                        style={{marginLeft: '10px'}}
                      >
                        activar
                      </ColorButton>
                    }
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
