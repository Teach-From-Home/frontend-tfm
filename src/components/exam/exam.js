import React, { useState } from 'react';
import youshallnotpass from '../../youshallnotpass.png';
import ADesarrollar from './aDesarrollar';
import MultipleChoice from './multipleChoice';
import { TextField, Grid, Box } from '@material-ui/core';
import { ColorButton } from './style';

export default function Exam() {
    const [showMultipleChoice, setShowMultipleChoice] = useState(false);
    const [showADesarrollar, setShowADesarrollar] = useState(false);

    

    return (
        <div>
            <Box m={1}>
                <TextField label="Descripcion del examen"></TextField>
                <Box m={2}>
                    <Grid>
                        <ColorButton onClick={() => setShowADesarrollar(!showADesarrollar)}>Agregar pregunta a desarrollar</ColorButton>
                        <ColorButton onClick={() => setShowMultipleChoice(!showMultipleChoice)} style={{marginLeft: '5px'}}>Agregar pregunta multiple choice</ColorButton>
                    </Grid>
                </Box>
            </Box>
            {
                showMultipleChoice ? 
                    <MultipleChoice></MultipleChoice>
                :
                    null
            }
            {
                showADesarrollar ? 
                    <ADesarrollar></ADesarrollar>
                :
                    null
            }
            <ColorButton>Enviar examen</ColorButton>
        </div>
    )
}
