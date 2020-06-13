import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '50%',
        minWidth: 450,
        margin: 10
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    button: {
        float: 'center',
        marginTop: '10px'
    },
    searchCard: {
        minWidth: 350,
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