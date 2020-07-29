import React, { useState, Fragment } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { YellowColorButton, GreyColorButton } from "./style";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ProfileService from "../../services/profileService";

export default function UserData({ profile, setProfile, setSnackbar }) {
  const [showPass, setShowPass] = useState(false);

  const profileService = new ProfileService();

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const update = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const editProfile = () => {
    try {
        profileService.editProfile(profile)
        .then(e => {
          setSnackbar({
            open: true,
            message: "Los cambios se han guardado exitosamente!",
            severity: "success",
          });
        })
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al guardar los datos..",
        severity: "error",
      });
    }
  }

  return (
    <Fragment>
      {profile ? (
        <div>
          <br></br>
          <Typography variant="h6">
            {profile.name} {profile.lastname}
          </Typography>
          <Typography variant="h6">DNI: {profile.dni}</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            name="email"
            label="Email"
            id="email"
            value={profile.email}
            style={{ width: "250px" }}
            onChange={update}
          />
          <br />
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              name="password"
              label="Contraseña"
              type={showPass ? "text" : "password"}
              id="password"
              value={profile.password}
              style={{ width: "250px" }}
              onChange={update}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPass}
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <YellowColorButton onClick={editProfile}>Aceptar</YellowColorButton>
          <GreyColorButton>Cancelar</GreyColorButton>
        </div>
      ) : (
        <div></div>
      )}
    </Fragment>
  );
}
