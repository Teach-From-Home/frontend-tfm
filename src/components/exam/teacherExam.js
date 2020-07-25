import React, { Fragment, useContext } from "react";
import { Grid, Box, CircularProgress } from "@material-ui/core";
import { YellowTypography } from "./style";
import { UserContext } from "../../userContext";
import NewExam from "./newExam";
import ExamCard from "./examCard";

export default function TeacherExam({ exams, getExams, setSnackbar, loading }) {
  const { user } = useContext(UserContext);

  return (
    <Fragment>
      <Box m={5}>
        <Grid container direction="row" justify="center">
          <Grid item xs>
            <YellowTypography variant="h6">
              {user.modifyExam ? "MODIFICAR EXAMEN" : "NUEVO EXAMEN"}
            </YellowTypography>
            <Box m={2}>
              <NewExam getExams={getExams} setSnackbar={setSnackbar}/>
            </Box>
          </Grid>
          <Grid item xs>
            <YellowTypography variant="h6">VER EXAMEN</YellowTypography>
            {!loading ? (
              <span>
                {exams.map((e) => {
                  return (
                    <Box m={2} key={e.id}>
                      <ExamCard teacher exam={e} getExams={getExams} />
                    </Box>
                  );
                })}
                {exams.length === 0 ? (
                  <YellowTypography variant="h6">
                    No hay examenes para mostrar..
                  </YellowTypography>
                ) : null}
              </span>
            ) : (
              <CircularProgress
                size={100}
                style={{ color: "#636363", marginTop: "200px" }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
