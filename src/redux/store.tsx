import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import { contactListReducer } from './reducers/contacts';
import { authReducer } from './reducers/login';

export const RootReducer = combineReducers({
  contactList: contactListReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof RootReducer>;

const loadAuth = () => {
  try {
    const serialisedAuth = window.localStorage.getItem('auth');
    if (!serialisedAuth) return undefined;
    return {auth: JSON.parse(serialisedAuth)};
  } catch (err) {
    return undefined;
  }
};

const authState = loadAuth();

export const store = createStore(RootReducer, authState, composeWithDevTools(applyMiddleware(thunk)));