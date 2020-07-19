import React, { useState, useEffect, useContext } from "react";
import { Card, Grid, Box, TextField, Typography } from "@material-ui/core";
import { ColorButton } from "./style";
import AvatarWithName from "../avatarWithName";
import { UserContext } from "../../userContext";
import ExamService from "../../services/examService";
import FinishedExam from "./finishedExam";

const modelCorrection = {
  teacherComment: "",
  grade: "",
};

export default function StudentsExamCard({ exam, setSnackbar }) {
  const examService = new ExamService();

  const [showComment, setShowComment] = useState(false);
  const [showFinishedExam, setShowFinishedExam] = useState(false);
  const [correction, setCorrection] = useState(modelCorrection);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setCorrection({
      teacherComment: exam.teacherComment,
      grade: exam.grade,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openComment = () => {
    setShowComment(!showComment);
  };

  const update = (e) => {
    setCorrection({
      ...correction,
      [e.target.name]: e.target.value,
    });
  };

  const correct = () => {
    try {
      examService
        .correctExam(correction, exam.studentId, user.selectedExam.id)
        .then(() => {
          setSnackbar({
            open: true,
            message: "Examen corregido exitosamente!",
            severity: "success",
          });
        })
        .catch(() => {
          setSnackbar({
            open: true,
            message: "Error al corregir examen...",
            severity: "error",
          });
        });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al corregir examen...",
        severity: "error",
      });
    }
  };

  return (
    <Card>
      <Box m={2}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item>
            <AvatarWithName
              name={exam.name}
              lastName={exam.lastname}
              noShowName
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h5">
                  {exam.name} {exam.lastname}{" "}
                </Typography>
              </Grid>

              <Grid item>
                <ColorButton
                  style={{ marginLeft: "10px" }}
                  onClick={openComment}
                >
                  {exam.teacherComment ? "ver correccion" : "corregir"}
                </ColorButton>
                <ColorButton
                  style={{ marginLeft: "10px" }}
                  onClick={() => {setShowFinishedExam(!showFinishedExam)}}
                >
                  {exam ? "ver examen" : "cerrar examen"}
                </ColorButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {showComment ? (
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <TextField
              label="Comentario"
              name="teacherComment"
              value={correction.teacherComment}
              onChange={update}
            />
            <TextField
              label="Nota"
              type="number"
              name="grade"
              value={correction.grade}
              onChange={update}
              InputProps={{
                inputProps: {
                  max: 10,
                  min: 1,
                },
              }}
            />
            <ColorButton onClick={correct}>Enviar</ColorButton>
          </Grid>
        ) : (
          <div></div>
        )}
      </Box>
      {showFinishedExam ? <FinishedExam exam={exam} /> : null}
    </Card>
  );
}
