import { ILoginPayload } from '@sv-connect/domain';
import { RegisterOptions } from 'react-hook-form';

const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const loginValue: ILoginPayload = {
  email: '',
  password: '',
};

export const loginValidation: Record<
  ILoginPayload['email' | 'password'],
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
  },
};
