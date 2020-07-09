import React from 'react'
import { TextField } from '@material-ui/core'
import { ColorButton } from '../exam/style'

export default function ADesarrollar() {
    return (
        <div>
            <TextField label="Pregunta" maxWidth></TextField>
            <ColorButton>Agregar pregunta</ColorButton>
        </div>
    )
}
