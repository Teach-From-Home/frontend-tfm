import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export default makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    buttonProgress: {
      position: 'absolute',
      top: '55.2%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
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