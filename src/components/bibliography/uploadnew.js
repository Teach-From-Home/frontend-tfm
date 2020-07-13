import React from 'react'
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import config from "../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import HomeworkService from "../../services/homeworkService";
import { UserContext } from "../../userContext";
import SnackbarOpen from "../snackbar/snackbar";
import { TextField, Box, Grid, Card, Typography, createMuiTheme, ThemeProvider } from '@material-ui/core';




function uploadnew() {
    return (
        <div>
            <Card style={{ marginTop: "10px" }}>
                <Box m={3}>
                <Typography variant="h6">Subir bibliografia</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={'auto'}>
                        <TextField label="Titulo" name="title" variant="outlined" ></TextField><br /><br />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField label="Descripcion" name="text" multiline rowsMax={50} variant="outlined" fullWidth />{/*TODO: validacion de caracteres*/} <br />
                    </Grid>
                </Grid>
                </Box>
            </Card>
        </div>
    )
}

export default uploadnew
