import React from 'react'
import { TextField, Box } from '@material-ui/core'
import { ColorButton } from '../exam/style'

export default function ADesarrollar() {
    return (
        <div>
            <Box m={2}>
                <TextField label="Pregunta" maxWidth></TextField>
                <ColorButton>Agregar pregunta</ColorButton>
            </Box>
        </div>
    )
}
