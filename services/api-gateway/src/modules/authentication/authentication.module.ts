import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthCode, CoreRpcException } from '@sv-connect/domain';
import config from 'config';
import { readFileSync } from 'fs';
import { JwtStrategy } from './strategies/jwt.strategy';
import 'dotenv/config';

@Module({
  imports: [
    JwtModule.register({
      signOptions: {
        algorithm: config.get('jwt.alg'),
        expiresIn: config.get('jwt.ttl'),
        issuer: config.get('jwt.iss'),
      },
      secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
        switch (requestType) {
          case JwtSecretRequestType.VERIFY:
            return readFileSync(
              `${process.cwd()}${config.get('jwt.publicKeyPath')}`,
            );
          default:
            throw CoreRpcException.new(AuthCode.INVALID_CREDENTIALS);
        }
      },
    }),
    PassportModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthenticationModule {}
