import React from 'react'
import { Typography, Card } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { ColorButton } from "./style"

function item({ item, editMode, onSelect }) {
    return (
        <Card>
            <Typography variant="h5" >{item.title}</Typography>
            <Typography>{item.description}</Typography>
            {
                editMode ?
                    <ColorButton
                        style={{ margin: '10px' }}
                        onClick={ ()=> onSelect(item) }
                    >
                        <Icon>edit</Icon>
                    </ColorButton>
                    : null
            }
            <a href={item.file} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "inherit" }} download>
                <ColorButton style={{ margin: '10px' }}>
                    <Icon>get_app</Icon>
                </ColorButton>
            </a>
            {
                editMode ?
                    <ColorButton style={{ margin: '10px' }}>
                        <Icon>delete</Icon>
                    </ColorButton>
                    : null
            }
        </Card>
    )
}

export default item
