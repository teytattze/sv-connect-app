import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as jose from 'jose';
import config from 'config';
import { join } from 'path';
import { IJwtPayload } from './jwt.interface';
import 'dotenv/config';

@Injectable()
export class JwtService {
  private readonly alg: string;
  private readonly publicKeyPath: string;

  constructor() {
    this.alg = config.get('jwt.alg');
    this.publicKeyPath = config.get('jwt.publicKeyPath');
  }

  async verifyJwt(
    token: string,
    options?: jose.JWTVerifyOptions,
  ): Promise<IJwtPayload> {
    try {
      const publicKey = await this.getPublicKey();
      const { payload } = await jose.jwtVerify(token, publicKey, {
        ...options,
      });
      return payload as IJwtPayload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getPublicKey() {
    const publicPem = fs.readFileSync(join(process.cwd(), this.publicKeyPath), {
      encoding: 'utf-8',
    });
    return await jose.importSPKI(publicPem, this.alg);
  }
}
