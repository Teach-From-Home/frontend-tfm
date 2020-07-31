import React, { useState, useEffect } from 'react'
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import Icon from '@material-ui/core/Icon';
import { ColorButton } from "./style"
import { TextField, Box, Grid, Card, Typography, CircularProgress, } from '@material-ui/core';

//const e = { target: { value:"", name:"" }}


function Uploadnew({ itemP, handleUpload, loading, clean }) {
    const [item, setItem] = useState(itemP)
    const [uploadProgress, setuploadProgress] = useState(0);
    const [uploading, setuploading] = useState(false);

    useEffect(() => {
        setItem(itemP)
    }, [itemP])


    if (!item)
        return <CircularProgress />

    const onChange = e => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    }

    const cantUpload = item.title === "" || item.file === ""


    const hasNoItemSelected = item.file === ""

    const handeUploadStart = () => {
        setuploading(true);
        setuploadProgress(0);
    };

    const handeUploadSucess = (name) => {
        setuploadProgress(100);

        firebase
            .storage()
            .ref("bibliography")
            .child(name)
            .getDownloadURL()
            .then((url) => {
                setuploading(false);
                setItem({ ...item, file: url });
            });
    };


    const handleProgess = (progress) => {
        setuploadProgress(progress);
    };

    return (
        <div>
            <Card style={{ marginTop: "10px" }}>
                <Box m={3}>
                    <Typography variant="h6">Subir bibliografia</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={'auto'}>
                            <TextField label="Titulo" name="title" variant="outlined" value={item.title} onChange={onChange}></TextField><br /><br />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Descripción" name="description" multiline rowsMax={50} variant="outlined" fullWidth value={item.description} onChange={onChange} />{/*TODO: validacion de caracteres*/} <br />
                        </Grid>

                    </Grid><br></br>
                    {uploading ? (
                        <CircularProgress variant='static' style={{ color: '#636363' }} value={uploadProgress} />
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
                                <strong>{!hasNoItemSelected ? "Seleccionar otro archivo" : "Seleccionar archivo"}</strong>
                                <FileUploader
                                    hidden
                                    accept='*'
                                    storageRef={firebase.storage().ref("/bibliography")}
                                    onUploadStart={handeUploadStart}
                                    onUploadSuccess={handeUploadSucess}
                                    onProgress={handleProgess}
                                    randomizeFilename
                                />
                            </label>
                        )}<br />
                    < ColorButton style={{ marginTop: '20px' }} onClick={() => handleUpload(item)} disabled={cantUpload}>
                        <Icon>backup</Icon> <span style={{ marginLeft: "10px" }} >Subir bibliografia</span>
                    </ColorButton>
                    < ColorButton style={{ marginTop: '20px', marginLeft: '10px' }} onClick={clean} >
                        Limpiar campos
                    </ColorButton>
                </Box>
            </Card>
        </div >
    )
}

export default Uploadnew
