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
        minWidth: 400,
        margin: 10
    },
    button: {
        float: 'center',
        marginTop: '10px'
    },
    searchCard: {
        minWidth: 350,
    },
    iconsBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
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