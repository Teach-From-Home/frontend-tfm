import React from "react";
import { Avatar, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundSize: "cover",

    backgroundPosition: "top center",

    borderRadius: "50%",
  },
}));

export default function AvatarWithName(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction='column' alignItems='center' justify='center'>
        <Avatar
          className={classes.large}
          src={props.url}
        ></Avatar>
        <Typography variant='h6'>{props.name}</Typography>
      </Grid>
    </div>
  );
}
