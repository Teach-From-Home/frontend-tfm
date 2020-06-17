import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import style from './style';
import TFMlogo from '../../TFM.png';
import { useHistory } from "react-router-dom";
import SnackbarOpen from '../snackbar/snackbar';
import { UserContext } from '../../userContext';
import LoginService from '../../services/loginService';

const Login = ({ loginUser }) => {
  const classes = style();
  let history = useHistory();
  const loginService = new LoginService();
  const {user, setUser} = useContext(UserContext);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  }

  const redirect = () => {
    history.push("/");
  }

  const [userToLog, setUserToLog] = useState({
    dni: '',
    password: ''
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      let dataUser = await loginService.login(userToLog);
      setUser(dataUser);
      redirect();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "error",
        severity: 'error'
      });
    }
  }

  const enterKeyPress = (e) => {
    if(e.which === 13){
      login(e)
    }
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setUserToLog({ ...userToLog, [name]: value });
  }

  const loginButtonDisabled = () => {
    return isEmpty(userToLog.password) || isEmpty(userToLog.dni);
  }

  const isEmpty = (aField) => {
    return aField === "";
  }

  return (
    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <img alt="TFMlogo" src={TFMlogo} height="90 rem"></img>
        <Typography component="h1" variant="h2">
          TFM
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dni"
            label="DNI"
            name="dni"
            autoComplete="dni"
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleInputChange}
            onKeyPress={enterKeyPress}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <div className={classes.wrapper}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
              disabled={loginButtonDisabled()}
            >
              Login
          </Button>
          </div>
        </form>
      </div>
      <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar}/>
    </Container>
  );
}

export default Login;
