import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Radio, Typography, Switch } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: `url("/p3.jpg")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    minHeight: '93.44vh'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchCard: {
    minWidth: 350
  }
}));

export const ColorButton = withStyles(theme => ({
    root: {
      color: '#000000',
      backgroundColor: '#d6a82a',
      '&:hover': {
        backgroundColor: '#636363',
      },
      borderRadius: '10px'
    }
}))(Button);

export const ColorRadio = withStyles({
  root: {
    color: '#d6a82a',
    '&$checked': {
      color: '#636363',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export const YellowTypography = withStyles({
  root: {
    color: "#d6a82a"
  }
})(Typography);

export const YellowSwitch = withStyles({
  switchBase: {
    color: "#e3e3e3",
    '&$checked': {
      color: "#d6a82a",
    },
    
    '&$checked + $track': {
      backgroundColor: "#d6a82a",
    },
  },
  checked: {},
  track: {backgroundColor: "#a3a3a3",},
})(Switch);