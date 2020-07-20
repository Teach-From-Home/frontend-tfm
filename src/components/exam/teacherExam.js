import React, { Fragment, useState, useContext, useEffect } from "react";
import { Grid, Box, CircularProgress } from "@material-ui/core";
import { YellowTypography } from "./style";
import { UserContext } from "../../userContext";
import NewExam from "./newExam";
import ExamCard from "./examCard";

export default function TeacherExam({ exams, getExams, setSnackbar }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <Fragment>
      <Box m={5}>
        <Grid container direction="row" justify="center">
          <Grid item xs>
            <YellowTypography variant="h6">
              {user.modifyExam ? "MODIFICAR EXAMEN" : "NUEVO EXAMEN"}
            </YellowTypography>
            <Box m={2}>
              <NewExam getExams={getExams} setSnackbar={setSnackbar} />
            </Box>
          </Grid>
          <Grid item xs>
            {exams.length === 0 ? (
              <YellowTypography variant="h6">
                No hay examenes para mostrar..
              </YellowTypography>
            ) : (
              <YellowTypography variant="h6">VER EXAMEN</YellowTypography>
            )}
            {exams ? (
              exams.map((e) => {
                return (
                  <Box m={2}>
                    <ExamCard teacher exam={e} key={e.id} getExams={getExams} />
                  </Box>
                );
              })
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
