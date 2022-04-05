import { ICreateAccountPayload } from '@sv-connect/domain';
import { RegisterOptions } from 'react-hook-form';

const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const registerValue = {
  name: '',
  email: '',
  password: '',
};

export const registerValidation: Record<
  ICreateAccountPayload['email' | 'password'],
  RegisterOptions
> = {
  email: {
    required: 'This field is required',
    pattern: {
      value: emailReg,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'This field is required',
    minLength: {
      value: 10,
      message: 'The minimum characters is 10',
    },
  },
};
