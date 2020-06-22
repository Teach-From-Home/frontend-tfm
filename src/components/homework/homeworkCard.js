import React, { useContext } from "react";
import { Typography, Grid, Card, Box, Avatar } from "@material-ui/core";
import { useStyles, ColorButton } from "./style";
import AvatarWithName from "../avatarWithName";
import { UserContext } from "../../userContext";
import { useHistory } from "react-router-dom";
import TeacherFeedback from "./teacherFeedback";
import FileUpload from "./fileUpload";

export default function HomeworkCard({ homework, callb, viewStudent }) {
  const classes = useStyles();
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);

  const redirectStudentHomework = () => {
    setUser({
      ...user,
      selectedHomework: homework,
    });
    history.push("/studentsHomework");
  };

  const fillModifyHomework = () => {
    setUser({
      ...user,
      modifyHomework: homework
    });
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Box m={2}>
          <Grid container spacing={3} >
            <Grid item xs={2}>
              <AvatarWithName
                name={`${homework.teacher.name}`}
                lastName={`${homework.teacher.lastname}`}
              ></AvatarWithName>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h6'>{homework.title}</Typography>
              <Typography variant='body1'>{homework.description}</Typography>
              {user.role === "STUDENT" ? (
                <span>
                  <TeacherFeedback uploaded={homework.uploadedHomeworks[0]} homework={homework} />
                  <FileUpload callb={callb} homework={homework} />
                </span>
              ) : (
                  <div>
                    <Box m={2}>
                      <ColorButton
                        className={classes.button}
                        onClick={fillModifyHomework}
                        style={{ marginLeft: '10px' }}
                      >
                        modificar
                    </ColorButton>
                      <ColorButton
                        className={classes.button}
                        onClick={redirectStudentHomework}
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
