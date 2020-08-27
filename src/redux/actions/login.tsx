import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import {
  AuthActionTypes,
  RESET_FORM_ERROR,
  IRequestStatus,
  CHANGE_AUTH_REQUEST_STATUS,
  ILoginSuccess,
  LOGIN_SUCCESS,
  ILoginForm,
  IRequestFailure,
  CHANGE_FORM_ERROR,
  LOGOUT_USER
} from "../typesLogin";
import { RootState, store } from "../store";


export function changeFormError(payload: IRequestFailure): AuthActionTypes {
  return {
    type: CHANGE_FORM_ERROR,
    payload
  }
};

export function resetFormError(): AuthActionTypes {
  return {
    type: RESET_FORM_ERROR,
    payload: ""
  }
};

export function changeRequestStatus(payload: IRequestStatus): AuthActionTypes {
  return {
    type: CHANGE_AUTH_REQUEST_STATUS,
    payload
  }
};

export function loginSuccess(payload: ILoginSuccess): AuthActionTypes {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
};

export function logoutUser(payload: {}): AuthActionTypes {
  return {
    type: LOGOUT_USER,
    payload
  }
};


export function login(url: string, data: ILoginForm): AppThunk {
  return async (dispatch) => {
    dispatch(changeRequestStatus({ loading: true, success: false }));
    dispatch(resetFormError());
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(async response => {
      if(response.ok) {
        return response.json()
      } else {
        const json = await response.json();
        const error: string = json;
        dispatch(changeFormError({error}))
        throw Error(response.statusText);
      }
    })
    .then(json => {
      if (json.accessToken) {
        dispatch(changeRequestStatus({ loading: false, success: true }));
        dispatch(loginSuccess({...json}));
        const state = store.getState();
        localStorage.setItem("auth", JSON.stringify(state.auth));
      }
    })
    .catch(err=> console.log(err))
  }
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>