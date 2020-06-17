import React, { useState, Fragment, useContext } from 'react'
import { Typography, Grid, TextField, Icon, Box } from '@material-ui/core';
import { useStyles, YellowColorButton, GreyColorButton } from './style';
import { UserContext } from '../../userContext';

export default function UserData(props) {
    const classes = useStyles();
    const {user, setUser} = useContext(UserContext);
    const [showPass, setShowPass] = useState(false);

    const toggleShowPass = () =>{
        setShowPass(!showPass)
    }

    return (
        <Fragment>
            <img></img>
            <Typography variant="h6">{user.name} {user.lastName}</Typography>
            <Typography variant="h6">DNI: {user.dni}</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                name="email"
                label="Email"
                id="email"
                value={user.email}
            /><br/>
            <TextField
                variant="outlined"
                margin="normal"
                name="password"
                label="Contraseña"
                type={showPass ? "text" : "password"}
                id="password"
                value={user.password}
            /> 
            <Icon style = {{marginTop: "2rem", marginLeft:"1rem"}} onClick={toggleShowPass}>visibility</Icon> <br/>
            <YellowColorButton>Aceptar</YellowColorButton>
            <GreyColorButton>Cancelar</GreyColorButton>
        </Fragment>
    )
}
