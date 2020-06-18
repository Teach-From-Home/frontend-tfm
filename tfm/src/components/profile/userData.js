import React, { useState, Fragment, useContext, useEffect } from 'react'
import { Typography, Grid, TextField, Icon, Box } from '@material-ui/core';
import { useStyles, YellowColorButton, GreyColorButton } from './style';
import { UserContext } from '../../userContext';

export default function UserData(props) {
    const classes = useStyles();
    const me = props.profile;
    const {user, setUser} = useContext(UserContext);
    const [showPass, setShowPass] = useState(false);


    const toggleShowPass = () =>{
        setShowPass(!showPass);
    }

    return (
        <Fragment>
            {
                me ? 
                <div>
                    <img></img>
                    <Typography variant="h6">{me.name} {me.lastname}</Typography>
                    <Typography variant="h6">DNI: {me.dni}</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="email"
                        label="Email"
                        id="email"
                        value={me.email}
                    /><br/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Contraseña"
                        type={showPass ? "text" : "password"}
                        id="password"
                        value={me.password}
                    /> 
                    <Icon style = {{marginTop: "2rem", marginLeft:"1rem"}} onClick={toggleShowPass}>visibility</Icon> <br/>
                    <YellowColorButton>Aceptar</YellowColorButton>
                    <GreyColorButton>Cancelar</GreyColorButton>
                </div>
                :
                <div></div>
            }
        </Fragment>
    )
}
