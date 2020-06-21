import React, { useState } from 'react';
import style from './style';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import TFMlogo from '../../TFM.png'

const Appbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = style();
  const history = useHistory()

  const handleLogout = () => {
    handleMenuClose()
    history.push("/login")
  }

  const redirectHome = () => {
    history.push("/")
  }
  const redirectprofile = () => {
    handleMenuClose()
    history.push("/perfil")
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /*if (!props.isLogged)
    return (<div></div>)
  else*/
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#636363'}}>
          <Toolbar className={classes.toolbar}>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <Icon>menu</Icon>
            </Button>
            <Button onClick={redirectHome} edge="start" className={classes.menuButton} aria-label="menu" >
                <img alt="TFMlogo" src={TFMlogo} height="50 rem"></img>
            </Button>
            <Typography variant="h6" className={classes.title}></Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default Appbar;