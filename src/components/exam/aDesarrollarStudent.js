import React, { useContext, useState } from 'react'
import { Card, Typography, TextField, CardHeader, Box } from '@material-ui/core'
import { UserContext } from '../../userContext';
import { useStyles } from './style';

export default function ADesarrollarStudent({question, index}) {
    const classes = useStyles();
    const [answer, setAnswer] = useState('');
    const { user, setUser } = useContext(UserContext);

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setAnswer({ ...answer, [name]: value });
    }


    return (
        <div className={classes.root}>
            <Card className={classes.searchCard}> 
            <CardHeader title={`${index + 1}. ${question.title}`} />
                <Box m={2}>
                {user.role === 'STUDENT' ?
                    <TextField label="Escribe tu comentario..." answer rowsMax={50} variant="outlined" name='text' onChange={handleInputChange} value={answer.text} />
                    :
                    null
                }
                </Box>
            </Card>
        </div>
    )
}
