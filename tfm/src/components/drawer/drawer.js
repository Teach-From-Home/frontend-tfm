import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TFMlogo from '../../TFM.png';
import { useHistory } from 'react-router-dom';
import { useStyles, ColorButton, YellowTypography } from './style';
import { Typography } from '@material-ui/core';

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const redirectHome = () => {
    history.push("/")
  }

  const redirectForum = () => {
    history.push("/forum")
  }

  const redirectClass = () => {
    history.push("/call")
  }

  const redirectHomework = () => {
    history.push("/homework")
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: '#636363'}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Button onClick={redirectHome} edge="start" className={classes.menuButton} aria-label="menu" >
            <img alt="TFMlogo" src={TFMlogo}  height="50 rem"></img>
          </Button>
          <span style={{display: 'flex', justifyContent: 'flex-end', width: '100%', padding: 0}}>
            <ColorButton>Perfil</ColorButton>
          </span>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key={'foro'} onClick={redirectForum}>
              <YellowTypography variant='h5'>Foro</YellowTypography>
            </ListItem>
            <ListItem button key={'clase'} onClick={redirectClass}>
              <YellowTypography variant='h5'>Clase</YellowTypography>
            </ListItem>
            <ListItem button key={'tarea'} onClick={redirectHomework}>
              <YellowTypography variant='h5'>Tarea</YellowTypography>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}