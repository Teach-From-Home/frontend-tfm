import React from "react";
import { Typography, Badge } from "@material-ui/core";

const teacherFeedback = ({ homework }) => {
    const uploaded = homework.uploadedHomeworks[0];
    return <div>{homework.uploaded ?
        <div>
            {uploaded.grade ?
                <div>
                <Typography variant="h5" gutterBottom>Correccion</Typography>
                    <Typography variant="body1" gutterBottom>Nota: <strong>{uploaded.grade}</strong></Typography>
                    <Typography variant="body1" gutterBottom>Comentario: <br/> {uploaded.coment}</Typography>
                </div>
                :
                <Typography variant="body1" gutterBottom>Correccion pendiente</Typography>
            }
        </div> :
        <div />}
    </div>;
};

export default teacherFeedback;
