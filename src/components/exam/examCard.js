import React, { useContext } from "react";
import { Typography, Grid, Card, Box } from "@material-ui/core";
import { useStyles, ColorButton, YellowTypography } from "./style";
import AvatarWithName from "../avatarWithName";
import { UserContext } from "../../userContext";
import { useHistory } from "react-router-dom";

const modelExam = {
  title: "",
  nose: "",
};

export default function ExamCard({ exam, teacher }) {
  const classes = useStyles();
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);

  const redirectStudentExam = () => {
    setUser({
      ...user,
      selectedExam: exam,
    });
    //history.push("/studentsHomework");
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
              {user.role === "STUDENT" ? (
                <span>
                  <ColorButton onClick={redirectDoExam}>Entrar</ColorButton>
                </span>
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
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}
