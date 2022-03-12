import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getExpiredUnixDate } from '@sv-connect/common';
import config from 'config';
import * as fs from 'fs';
import * as jose from 'jose';
import { join } from 'path';
import { JwtAccount, JwtPayload } from './jwt.interface';
import 'dotenv/config';

@Injectable()
export class JwtService {
  private readonly ttl: number;
  private readonly alg: string;
  private readonly publicKeyPath: string;
  private readonly privateKeyPath: string;

  constructor() {
    this.ttl = config.get('jwt.ttl');
    this.alg = config.get('jwt.alg');
    this.publicKeyPath = config.get('jwt.publicKeyPath');
    this.privateKeyPath = config.get('jwt.privateKeyPath');
  }

  async createJwt(account: JwtAccount) {
    const privateKey = await this.getPrivateKey();
    return await new jose.SignJWT({ account })
      .setProtectedHeader({ alg: this.alg })
      .setExpirationTime(getExpiredUnixDate(this.ttl))
      .sign(privateKey);
  }

  async generateKeyPair() {
    const { privateKey, publicKey } = await jose.generateKeyPair(this.alg, {
      modulusLength: 4096,
    });

    const privatePem = await jose.exportPKCS8(privateKey);
    const publicPem = await jose.exportSPKI(publicKey);

    fs.writeFileSync(join(process.cwd(), this.privateKeyPath), privatePem);
    fs.writeFileSync(join(process.cwd(), this.publicKeyPath), publicPem);
  }

  async verifyJwt(
    token: string,
    options?: jose.JWTVerifyOptions,
  ): Promise<JwtPayload> {
    try {
      const publicKey = await this.getPublicKey();
      const { payload } = await jose.jwtVerify(token, publicKey, {
        ...options,
      });
      return payload as JwtPayload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getPrivateKey() {
    const privatePem = fs.readFileSync(
      join(process.cwd(), this.privateKeyPath),
      {
        encoding: 'utf-8',
      },
    );
    return await jose.importPKCS8(privatePem, this.alg);
  }

  async getPublicKey() {
    const publicPem = fs.readFileSync(join(process.cwd(), this.publicKeyPath), {
      encoding: 'utf-8',
    });
    return await jose.importSPKI(publicPem, this.alg);
  }
}
