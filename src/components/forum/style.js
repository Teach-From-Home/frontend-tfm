import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Switch, Badge } from '@material-ui/core';

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
    marginTop: '10px',
  },
  searchCard: {
    minWidth: 350,
  },
  iconsBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  buttonProgress: {
    position: 'absolute',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    color: '#636363'
  },
  badge: {
    color: "#636363",
    background: "#d6a82a"
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
  track: { backgroundColor: "#a3a3a3", },
})(Switch);

export const StyledBadge = withStyles((theme) => ({
  badge: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(12),
    minWidth: 10 * 2,
    lineHeight: 1,
    height: 10 * 2,
    borderRadius: 10,
    zIndex: 1, // Render the badge on top of potential ripples.
    padding: '0 6px',
    backgroundColor: '#d6a82a',
    color: '#303030'
  },
}))(Badge);