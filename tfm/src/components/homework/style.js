import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    backgroundImg: {
        backgroundImage: `url("/p1.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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

export const YellowTypography = withStyles({
    root: {
      color: "#d6a82a"
    }
})(Typography);