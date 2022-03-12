import { createParamDecorator } from '@nestjs/common';
import httpContext from 'express-http-context';
import { IJwtPayloadAccount } from '../../modules/jwt/jwt.interface';

export const Account = createParamDecorator(
  (data: keyof IJwtPayloadAccount) => {
    const account = httpContext.get('account');
    return data ? account[data] : account;
  },
);
