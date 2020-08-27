interface IValues {
  name: string,
  surname: string,
  phone: string,
  address: string
}

interface IValuesLogin {
  email: string,
  password: string
}

interface IIndex {
  [key: string]: string
}

interface IValuesError extends IIndex, IValues {}
interface IValuesLoginError extends IIndex, IValuesLogin {}

type IError = IValuesError | IValuesLoginError
type IValue = IValues | IValuesLogin;

const initValuesError = {
  name: '',
  surname: '',
  phone: '',
  address: ''
};

const initValuesLoginError = {
  email: '',
  password: ''
};

export const validateValues = (
  values: IValue,
) => {
  let errors: IError;
  const pattern = /.+@.+\..+/i;
  const patternPassword = /^[A-Za-z0-9]{8,}$/;

  'email' in values ? errors = {...initValuesLoginError} : errors = {...initValuesError};

  for (const [key, value] of Object.entries(values)) {
    if(!value) {
      errors[key] = 'Это поле не может быть пустым'
    } else if ('email' in values && key === 'email' && !pattern.test(values.email)) {
      errors[key] = 'Некорректно заполнено поле';
    } else if('password' in values && key === 'password' && !patternPassword.test(values.password)) {
      errors[key] = 'Пароль должен состоять из 8 символов и содержать латинские буквы разного регистра';
    }
  }

  return errors;
}