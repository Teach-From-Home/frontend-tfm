import React, { useState, useContext } from "react";

import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import config from "../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import HomeworkService from "../../services/homeworkService";
import { UserContext } from "../../userContext";
import SnackbarOpen from "../snackbar/snackbar";

firebase.initializeApp(config);

const FileUpload = ({homework, callb }) => {
  const homeworkService = new HomeworkService();
  const { user } = useContext(UserContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // eslint-disable-next-line no-unused-vars
  const [file, setfile] = useState();
  const [uploadProgress, setuploadProgress] = useState(0);
  const [uploaded, setuploaded] = useState(homework.uploaded);
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
      open: false,
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
      uploaded ?
      homeworkService.reUploadHomework(user.id, homework.id, { file: url }).then(()=>callb()):
      homeworkService.uploadHomework(user.id, homework.id, { file: url }).then(()=>callb())
      setSnackbar({
        open: true,
        message: "Archivo subido exitosamente!",
        severity: "success",
      });
      setuploaded(true)
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
            <CircularProgress variant='static' style={{color:'#636363'}} value={uploadProgress} />
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
              accept='.zip, .docx, .doc, .xlsx, .xls, .pdf, .rar, image/*'
              storageRef={firebase.storage().ref("/homeworks")}
              onUploadStart={handeUploadStart}
              onUploadSuccess={handeUploadSucess}
              onUploadError={snackError}
              onProgress={handleProgess}
              randomizeFilename
            />
          </label>
        )}

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
        <SnackbarOpen
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          closeSnac={closeSnackbar}
        />
    </div>
  );
};

export default FileUpload;
