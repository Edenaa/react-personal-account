export interface ILoginForm {
  email: string,
  password: string
};

export interface IFormStatus {
  loading?: boolean,
  success?: boolean,
};

export interface IChangeFieldValue {
  fieldName: string,
  value: string,
};

export interface ILoginSuccess {
  accessToken: any,
  state: string
};

export interface IRequestStatus {
  loading: boolean,
  success: boolean,
};

export interface IRequestFailure {
  error?: string
};

export interface IAuth extends IRequestFailure {
  login: IFormStatus,
  access: any,
  state: string
};

export const CHANGE_FORM_ERROR = 'CHANGE_FORM_ERROR';
export const RESET_FORM_ERROR = 'RESET_FORM_ERROR';

export const CHANGE_AUTH_REQUEST_STATUS = 'CHANGE_AUTH_REQUEST_STATUS';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';

interface ChangeFormError {
  type: typeof CHANGE_FORM_ERROR,
  payload: IRequestFailure,
};

interface ResetFormError {
  type: typeof RESET_FORM_ERROR,
  payload: "",
};

interface ChangeRequestStatus {
  type: typeof CHANGE_AUTH_REQUEST_STATUS,
  payload: IRequestStatus,
};

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS,
  payload: ILoginSuccess,
};

interface LogoutUser {
  type: typeof LOGOUT_USER,
  payload: {},
};

export type AuthActionTypes = ResetFormError | ChangeRequestStatus
  | LoginSuccess | ChangeFormError | LogoutUser;