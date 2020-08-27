import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  makeStyles,
  Button,
  InputAdornment,
  IconButton,
  TextField
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { RootState } from '../redux/store';
import { login } from '../redux/actions/login';
import { validateValues } from '../helpers/formValidate';

const useStyles = makeStyles({
  input: {
    width: '100%',
    marginBottom: 15
  },
  form: {
    maxWidth: 350,
    minWidth: 300,
    width: '100%',
    textAlign: 'center'
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
  },
  error: {
    marginBottom: 15,
    marginTop: 5,
    color: 'red',
  }
});

interface IValuesLogin {
  email: string,
  password: string
}

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(({auth}: RootState) => auth.error);
  const [valuesForm, setValuesForm] = useState({email: "", password: ""});
  const [validateErrors, setValidateErrors] = useState({ email: '', password: '' });
  const [visibility, setVisibility] = useState(false);

  const visibilityToggle = () => {
    setVisibility(!visibility);
  }

  const onChange = (fieldName: string, value: string) => {
    setValuesForm({
      ...valuesForm,
      [fieldName]: value
    })
  };

  const isAllZeroLength = (element:string, index: number, array: string[]) => {
    return element.length === 0;
  }

  const onLogin = (valuesForm: IValuesLogin) => {
    const errors = validateValues(valuesForm);
    setValidateErrors({...errors} as IValuesLogin);
    if (Object.values(errors).every(isAllZeroLength)) {
      dispatch(login('/api/login', valuesForm));
    }
  }
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      onLogin({...valuesForm});
    }
  }

  return (
    <Container className={classes.root}>
      <form className={classes.form} onKeyPress={(event) => handleKeyPress(event)}>
        <TextField
          helperText={validateErrors.email && validateErrors.email}
          placeholder="Введите email"
          type="email"
          value={valuesForm.email}
          className={classes.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("email", e.target.value)}
          error={(error !== undefined && error.length > 0) || (validateErrors.email.length > 0)}
        />
        <TextField
          helperText={validateErrors.email && validateErrors.password}
          placeholder="Введите пароль"
          value={valuesForm.password}
          className={classes.input}
          type={visibility ? "text" : "password"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("password", e.target.value)}
          error={(error !== undefined && error.length > 0) || (validateErrors.password.length > 0)}
          InputProps={{
            endAdornment: 
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={visibilityToggle}
                >
                  {visibility ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Button variant="contained" color="primary" onClick={() => onLogin(valuesForm)}>
          Войти
        </Button>
      </form>
    </Container>
  )
}

export default Login;

// email test@test.ru
// password testtesttest