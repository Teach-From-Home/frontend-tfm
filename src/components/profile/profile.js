import React, { useEffect, useContext, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { useStyles } from "./style";
import UserData from "./userData";
import { UserContext } from "../../userContext";
import ProfileService from "../../services/profileService";
import Calendar from "./calendar";
import SnackbarOpen from "../snackbar/snackbar";

export default function Profile() {
  const classes = useStyles();
  const [profile, setProfile] = useState();
  const { user } = useContext(UserContext);
  const profileService = new ProfileService();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const getProfile = async () => {
    try {
      let profile = await profileService.getProfile(user.id);
      setProfile(profile);
    } catch (error) {}
  };

  return (
    <div className={classes.root}>
      <Box m={2}>
        <Grid container direction="row" justify="center">
          <Grid item xs={9}>
            <Calendar />
          </Grid>
          <Grid item xs={3}>
            <UserData profile={profile} setProfile={setProfile} setSnackbar={setSnackbar}></UserData>
          </Grid>
        </Grid>
      </Box>
      <SnackbarOpen
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnac={closeSnackbar}
      />
    </div>
  );
}
