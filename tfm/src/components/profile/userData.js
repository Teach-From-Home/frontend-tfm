import React, { useState, Fragment, useContext, useEffect } from 'react'
import { Typography, Grid, TextField, Icon, Box, InputAdornment, IconButton } from '@material-ui/core';
import { useStyles, YellowColorButton, GreyColorButton } from './style';
import { UserContext } from '../../userContext';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
                        style={{width:'250px'}}
                    /><br/>
                    <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Contraseña"
                        type={showPass ? "text" : "password"}
                        id="password"
                        value={me.password}
                        style={{width:'250px'}}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={toggleShowPass}
                                >
                                  {showPass ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                    />
                    </div>
                    <YellowColorButton>Aceptar</YellowColorButton>
                    <GreyColorButton>Cancelar</GreyColorButton>
                </div>
                :
                <div></div>
            }
        </Fragment>
    )
}
