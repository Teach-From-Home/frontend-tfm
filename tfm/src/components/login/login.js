import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress'
import style from './style'
import TFMlogo from '../../TFM.png'
import { useHistory } from "react-router-dom";
import SnackbarOpen from '../snackbar/snackbar'

const Login = ({ loginUser }) => {
  const classes = style();
  let history = useHistory();

  const callbackLogin = () => {
    history.push("/");
  }

  const [loginForm, setloginForm] = useState({
    dni: "",
    password: "",
    callbackFn: callbackLogin
  });

  const login = (e) => {
    e.preventDefault();
    loginUser(loginForm);
  }

  const enterKeyPress = (e) => {
    if(e.which === 13){
      login(e)
    }
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setloginForm({ ...loginForm, [name]: value });
  }

  const loginButtonDisabled = () => {
    return isEmpty(loginForm.password) || isEmpty(loginForm.dni);
  }

  const isEmpty = (aField) => {
    return aField === "";
  }

  return (
    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <img alt="plane logo" src={TFMlogo} height="90 rem"></img>
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
            { /*<CircularProgress size={24} className={classes.buttonProgress} /> */}
          </div>
        </form>
      </div>
      <div>

      </div>
      { /* <SnackbarOpen open={hasError} message={errorMsg} severity="error"/> */}
    </Container>
  );
}

export default Login;
