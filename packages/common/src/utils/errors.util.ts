import { HttpException } from '@nestjs/common';
import { IResponseError } from '@sv-connect/domain/errors';

export const handleClientServiceError = (err: IResponseError | any) => {
  const statusCode = err.statusCode || 500;
  throw new HttpException(err, statusCode);
};
