import React, { useEffect, useContext, useState } from 'react'
import { Typography, Grid, Box, Avatar } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import UserData from './userData';
import { UserContext } from '../../userContext';
import ProfileService from '../../services/profileService';
import Calendar from './calendar'

const modelProfile = {

}

export default function Profile() {
    const classes = useStyles();
    const [profile, setProfile] = useState();
    const { user, setUser } = useContext(UserContext);
    const profileService = new ProfileService();

    useEffect(() => { 
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            let profile = await profileService.getProfile(user.id);
            setProfile(profile);
        } catch (error) {

        }
    }

    return (
        <div className={classes.root}>
            <Box m={2}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                >
                    <Grid item xs>
                        <UserData profile={profile}></UserData>
                    </Grid>
                    <Grid item xs>
                        <Calendar />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
