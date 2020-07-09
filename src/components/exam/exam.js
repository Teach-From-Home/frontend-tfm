import React from 'react';
import youshallnotpass from '../../youshallnotpass.png';
import ADesarrollar from './aDesarrollar';
import MultipleChoice from './multipleChoice';
import { TextField, Grid } from '@material-ui/core';
import { ColorButton } from './style';

export default function Exam() {
    return (
        <div>
            <Grid>
                <TextField label="Descripcion del examen"></TextField>
                <ColorButton>Agregar pregunta a desarrollar</ColorButton>
                <ColorButton>Agregar pregunta multiple choice</ColorButton>
            </Grid>
            <ADesarrollar></ADesarrollar>
            <MultipleChoice></MultipleChoice>
            <ColorButton>Enviar examen</ColorButton>
        </div>
    )
}
