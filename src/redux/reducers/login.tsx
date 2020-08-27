import {
  IAuth,
  AuthActionTypes,
  CHANGE_AUTH_REQUEST_STATUS,
  CHANGE_FORM_ERROR,
  RESET_FORM_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_USER
} from "../typesLogin";

import jwt from 'jwt-decode';

export const initialState: IAuth = {
  login: {
    loading: false,
    success: false,
  },
  error: "",
  access: {},
  state: "unauthorized",
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): IAuth {
  switch (action.type) {
    case CHANGE_AUTH_REQUEST_STATUS:
      return {
        ...state,
        login: {
          ...state.login,
          ...action.payload
        }
      };
    case CHANGE_FORM_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case RESET_FORM_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        access: {
          token: action.payload.accessToken,
          ...jwt(action.payload.accessToken)
        },
        state: "authorized"
      };
    case LOGOUT_USER:
      return {
        ...state,
        access: action.payload,
        state: "unauthorized"
      };
    default:
      return state;
  }
};