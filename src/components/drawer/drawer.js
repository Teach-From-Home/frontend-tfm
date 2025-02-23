import { Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import LoginService from "../../services/loginService";
import TFMlogo from "../../TFM.png";
import { UserContext } from "../../userContext";
import AvatarWithName from "../avatarWithName";
import { useStyles, YellowTypography } from "./style";

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const loginService = new LoginService();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const redirectHome = () => {
    setUser({
      ...user,
      selectedClassroom: null,
    });
    localStorage.clear();
    history.push("/");
  };

  const redirectProfile = () => {
    history.push("/profile");
    setOpen(false);
  };

  const redirectForum = () => {
    history.push("/forum");
    setOpen(false);
  };

  const redirectClass = () => {
    history.push("/call");
    setOpen(false);
  };

  const redirectHomework = () => {
    history.push("/homework");
    setOpen(false);
  };

  const redirectExam = () => {
    history.push("/exam");
    setOpen(false);
  };

  const redirectBibliography = () => {
    history.push("/bibliography");
    setOpen(false);
  };

  const redirectReports = () => {
    history.push("/reports");
    setOpen(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    setUser(null);
    history.push("/login");
    loginService.logout();
  };

  return (
    <div className={classes.root}>
      {user ? (
        <div>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
            style={{ backgroundColor: "#636363" }}
          >
            <Toolbar>
              {localStorage.getItem("classroomId") ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <div></div>
              )}
              <Button
                onClick={redirectHome}
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
              >
                <img alt="TFMlogo" src={TFMlogo} height="50 rem"></img>
              </Button>
              <span
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  padding: 0,
                  height: "3rem",
                }}
              >
                <span onClick={handleClickMenu}>
                  <AvatarWithName
                    name={user.name}
                    lastName={user.lastName}
                    noShowName
                  />
                </span>
                <Button
                  color="inherit"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickMenu}
                >
                  <Icon>keyboard_arrow_down</Icon>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem>Hola, {user.name}</MenuItem>
                  <MenuItem onClick={redirectProfile}>Perfil</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
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
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button key={"foro"} onClick={redirectForum}>
                <ListItemIcon className={classes.icon}>
                  <Icon>forum</Icon>
                </ListItemIcon>
                <ListItemText>
                  <YellowTypography variant="subtitle1">FORO</YellowTypography>
                </ListItemText>
              </ListItem>
              <ListItem button key={"clase"} onClick={redirectClass}>
                <ListItemIcon className={classes.icon}>
                  <Icon>live_tv</Icon>
                </ListItemIcon>
                <ListItemText>
                  <YellowTypography variant="subtitle1">CLASE</YellowTypography>
                </ListItemText>
              </ListItem>
              <ListItem button key={"tarea"} onClick={redirectHomework}>
                <ListItemIcon className={classes.icon}>
                  <Icon>create</Icon>
                </ListItemIcon>
                <ListItemText>
                  <YellowTypography variant="subtitle1">TAREA</YellowTypography>
                </ListItemText>
              </ListItem>
              <ListItem button key={"examen"} onClick={redirectExam}>
                <ListItemIcon className={classes.icon}>
                  <Icon>menu_book</Icon>
                </ListItemIcon>
                <ListItemText>
                  <YellowTypography variant="subtitle1">
                    EXAMEN
                  </YellowTypography>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                key={"bibliografia"}
                onClick={redirectBibliography}
              >
                <ListItemIcon className={classes.icon}>
                  <Icon>description</Icon>
                </ListItemIcon>
                <ListItemText>
                  <YellowTypography variant="subtitle1">
                    BIBLIOGRAFIA
                  </YellowTypography>
                </ListItemText>
              </ListItem>
              {user.role === "TEACHER" ? (
                <ListItem button key={"reportes"} onClick={redirectReports}>
                  <ListItemIcon className={classes.icon}>
                    <Icon>leaderboard</Icon>
                  </ListItemIcon>
                  <ListItemText>
                    <YellowTypography variant="subtitle1">
                      REPORTES
                    </YellowTypography>
                  </ListItemText>
                </ListItem>
              ) : null}
            </List>
            <Divider />
          </Drawer>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
