import { createParamDecorator } from '@nestjs/common';
import { IAccount } from '@sv-connect/domain';
import httpContext from 'express-http-context';

export const Account = createParamDecorator((data: keyof IAccount) => {
  const account = httpContext.get('account');
  return data ? account[data] : account;
});
