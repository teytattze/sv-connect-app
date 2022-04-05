import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAccount, ILoginPayload } from '@sv-connect/domain';
import * as bcrypt from 'bcryptjs';
import _ from 'lodash';
import { AdminAccountsService } from '../accounts/accounts.admin.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly adminAcountsService: AdminAccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount({ email, password }: ILoginPayload): Promise<IAccount> {
    const { data: account } = await this.adminAcountsService.getAccountByEmail(
      email,
    );
    if (!account || !password || !email) return null;
    const isMatched = await this.compareHashedPassword(
      password,
      account.password,
    );
    if (account && isMatched) {
      delete account.password;
      return account;
    }
    return null;
  }

  async login(account: IAccount): Promise<{ accessToken: string }> {
    const payload = {
      sub: account.id,
      account,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  validateJwt(jwtAccount: IAccount, cookieAccount: IAccount): boolean {
    return _.isEqual(jwtAccount, cookieAccount);
  }

  private async compareHashedPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
