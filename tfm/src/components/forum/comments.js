import React, { useState, useContext } from 'react'
import { Grid, Box, Avatar, CardHeader, TextField, Typography, Divider } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import UserComment from './userComment';
import ForumService from '../../services/forumService';
import { UserContext } from '../../userContext'

const commentModel = {
    text: ''
}

export default function Comments(props) {
    const classes = useStyles();
    const [comment, setComment] = useState(commentModel)
    const {user, setUser} = useContext(UserContext);

    const comments = props.comments;
    const setSnackbar = props.setSnackbar;
    const forumService = new ForumService();

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setComment({ ...comment, [name]: value });
    }

    const sendComment = async () => {
        try {
            let comment = await forumService.newComment(comment, user.id, user.selectedClassroom.id);
            setComment(commentModel);
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'err.response.data.message', //TODO!
                severity: 'error'
            });
        }
    }

    return (
        <div >
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid item xs={'auto'}>
                        <Avatar></Avatar>
                    </Grid> 
                    <Grid item xs={'auto'}>
                        <div className={classes.iconsBottom}>
                            <TextField label="Escribe tu mensaje..." multiline rowsMax={4} variant="outlined" name='text' onChange={handleInputChange}/>{/*TODO: validacion de caracteres*/} <br/>
                            <ColorButton style={{marginLeft: '10px', marginTop: '10px'}} onClick={sendComment}>Enviar</ColorButton>
                        </div>
                    </Grid>
                </Grid>
                {
                    comments.map(c => {
                        return <UserComment comment={c} key={c.id}/>
                    })
                }
                
            </Box>
            
    </div>
    )
}
