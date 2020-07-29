import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    backgroundImage: `url("/p4.jpg")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    minHeight: '93.44vh'
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
    },
}))(Button);