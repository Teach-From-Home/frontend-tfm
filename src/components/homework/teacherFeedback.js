import React from "react";
import { Typography } from "@material-ui/core";
import UploadedDate from "./uploadedDate";

const teacherFeedback = ({ uploaded, homework }) => {

    const uploadedOutOfTerm = () => {
        if (uploaded)
            return uploaded.outOfTerm
    }

    if (!uploaded && homework) return (
        <span>
            {
                homework.isOnTerm ?
                    <Typography variant='body1'>Entregar antes del: {homework.deadLine}</Typography> :
                    <Typography variant='body1' color="error">Vencida el {homework.deadLine}</Typography>
            }
            <hr />
        </span>
    )

    if (!uploaded) return <span></span>

    return (
        <div>
            <UploadedDate uploadedOutOfTerm={uploadedOutOfTerm()} uploadDate={uploaded.uploadDate} />
            {uploaded.grade ?
                <div>
                    <Typography variant="h5" gutterBottom>Correccion</Typography>
                    <Typography variant="body1" gutterBottom>Comentario: <br /> {uploaded.coment}</Typography>
                    <Typography variant="body1" gutterBottom>Nota: <strong>{uploaded.grade}</strong></Typography>
                </div>
                :
                <Typography variant="body1" gutterBottom>Correccion pendiente</Typography>
            }
        </div>);
};

export default teacherFeedback;
