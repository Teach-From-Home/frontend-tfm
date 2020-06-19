import React, { useState, useContext } from "react";

import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import config from "../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import HomeworkService from "../../services/homeworkService";
import { UserContext } from "../../userContext";
import { Typography } from "@material-ui/core";
import SnackbarOpen from "../snackbar/snackbar";

firebase.initializeApp(config);

const FileUpload = ({ hwId }) => {
  const homeworkService = new HomeworkService();
  const { user, setUser } = useContext(UserContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [file, setfile] = useState();
  const [uploadProgress, setuploadProgress] = useState(0);
  const [uploaded, setuploaded] = useState(false);
  const [uploading, setuploading] = useState(false);

  const handeUploadStart = () => {
    setuploading(true);
    setuploadProgress(0);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: true,
    });
  };

  const handeUploadSucess = (name) => {
    setuploadProgress(100);
    setfile(name);
    firebase
      .storage()
      .ref("homeworks")
      .child(name)
      .getDownloadURL()
      .then((url) => {
        setuploading(false);
        saveUploadedUrl(url);
      });
  };

  const saveUploadedUrl = (url) => {
    try {
      homeworkService.uploadHomework(user.id, hwId, { file: url });
      setSnackbar({
        open: true,
        message: "Archivo subido exitosamente!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al subir el archivo, intente nuevamente mas tarde",
        severity: "error",
      });
    }
  };

  const snackError = () => {
    setSnackbar({
      open: true,
      message: "Error al subir el archivo, intente nuevamente mas tarde",
      severity: "error",
    });
  };

  const handleProgess = (progress) => {
    setuploadProgress(progress);
  };

  const UploaderButton = ({ text }) => {
    return (
      <div>
        {uploading ? (
          <span>
            <Typography>Subiendo archivo</Typography>
            <CircularProgress variant='static' value={uploadProgress} />
          </span>
        ) : (
          <label
            style={{
              color: "#000000",
              backgroundColor: "#d6a82a",
              "&:hover": {
                backgroundColor: "#636363",
              },
              borderRadius: "10px",
              cursor: "pointer",
              padding: 10,
            }}
          >
            {text}
            <FileUploader
              hidden
              accept='.zip, .docx, .doc, .xlsx, .xls, .pdf, .rar'
              storageRef={firebase.storage().ref("/homeworks")}
              onUploadStart={handeUploadStart}
              onUploadSuccess={handeUploadSucess}
              onUploadError={snackError}
              onProgress={handleProgess}
              randomizeFilename
            />
          </label>
        )}
        <SnackbarOpen
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          closeSnac={closeSnackbar}
        />
      </div>
    );
  };

  return (
    <div>
      <br />
      {uploaded ? (
        <UploaderButton text='Volver a subir' />
      ) : (
        <UploaderButton text='Subir archivo' />
      )}
    </div>
  );
};

export default FileUpload;
