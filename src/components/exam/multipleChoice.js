import React, { useState } from 'react'
import { TextField, Button, Checkbox } from '@material-ui/core'
import { ColorButton } from '../exam/style'

export default function MultipleChoice() {
    return (
        <div>
            <TextField label="Pregunta"></TextField>
            <ExamChoice></ExamChoice>
        </div>
    )
}

function ExamChoice() {

    const [options, setOptions] = useState([]);

    const addOption = () => {
        setOptions(options => [...options, 
            (
                <div>
                <Checkbox></Checkbox>
                <TextField label="Texto de la respuesta"></TextField>
                </div>
            )
        ])
    }

    return (
        <div>
            <ColorButton onClick={addOption}>Nueva Opcion</ColorButton>
            {
                options ?
                    options.map( o => {
                        return o
                    })
                :
                null
            }
            


        </div>
    ) 
}