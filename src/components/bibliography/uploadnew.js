import React, { useState, useEffect } from 'react'
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import Icon from '@material-ui/core/Icon';
import { ColorButton } from "./style"
import SnackbarOpen from "../snackbar/snackbar";
import { TextField, Box, Grid, Card, Typography, ListItem, CircularProgress, } from '@material-ui/core';

//const e = { target: { value:"", name:"" }}


function Uploadnew({ itemP, handleUpload }) {
    const [item, setItem] = useState(itemP)

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

                    </Grid>
                    <ColorButton style={{ marginTop: '20px' }} onClick={() => handleUpload(item)}>
                        <Icon>backup</Icon> <span style={{ marginLeft: "10px" }}>Subir bibliografia</span>
                    </ColorButton>
                </Box>
            </Card>
        </div>
    )
}

export default Uploadnew
