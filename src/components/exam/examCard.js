import React, { useContext } from "react";
import { Typography, Grid, Card, Box } from "@material-ui/core";
import { useStyles, ColorButton } from "./style";
import AvatarWithName from "../avatarWithName";
import { UserContext } from "../../userContext";
import { useHistory } from "react-router-dom";

const modelExam = {
  title: "",
  nose: "",
};

export default function ExamCard({ exam, callb, teacher }) {
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
        modifyExam: exam
      });
    }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Box m={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{exam.title}</Typography>
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
              {user.role === "STUDENT" ? (
                <span>
                  <p>un botn pa hacer, la nota y eso</p>
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
