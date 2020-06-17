import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    card: {
        width: '50%',
        minWidth: 400,
        margin: 10
    },
    button: {
        float: 'right'
    }
}));

export const YellowColorButton = withStyles(theme => ({
    root: {
      color: '#000000',
      backgroundColor: '#d6a82a',
      '&:hover': {
        backgroundColor: '#636363',
      },
      borderRadius: '10px'
    }
}))(Button);

export const GreyColorButton = withStyles(theme => ({
    root: {
      color: '#000000',
      backgroundColor: '#636363',
      '&:hover': {
        backgroundColor: '#d6a82a',
      },
      borderRadius: '10px',
      marginLeft: '5px'
    }
}))(Button);