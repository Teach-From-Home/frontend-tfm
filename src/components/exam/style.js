import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Radio } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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