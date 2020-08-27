import React from 'react';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import { useAuth } from './authContext';


const AuthRoute = ({...props}) => {
  const {state} = useAuth();
  return state === "authorized" ? (
    <Route {...props} component={() => <Redirect to="/contacts" />} />
  ) : (
    <Route {...props} />
  )
}

const PrivateRoute = ({...props}) => {
  const {state} = useAuth();
  return state === "authorized" ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={() => <Redirect to="/" />} />
  )
}

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/" component={Login} exact />
        <PrivateRoute path="/contacts/" component={Contacts} exact />
      </Switch>
    </BrowserRouter>
  )
}