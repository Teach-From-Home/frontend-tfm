import React, { useEffect, useContext, useState } from 'react'
import { Typography, Grid, Box, Avatar } from '@material-ui/core';
import { useStyles, ColorButton } from './style';
import UserData from './userData';
import { UserContext } from '../../userContext';
import ProfileService from '../../services/profileService';

const modelProfile = {

}

export default function Profile() {
    const classes = useStyles();
    const [profile, setProfile] = useState();
    const {user, setUser} = useContext(UserContext);
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
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <UserData profile={profile}></UserData>
                    </Grid> 
                    <Grid item xs={6}>
                        holi
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
