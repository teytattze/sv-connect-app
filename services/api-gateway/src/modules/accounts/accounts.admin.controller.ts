import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AccountDto,
  AdminGetAccountByEmailParam,
  CoreHttpResponse,
} from '@sv-connect/domain';
import { AccountsService } from './accounts.service';

@ApiTags('Accounts')
@Controller('accounts/admin')
export class AdminAccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('emails/:email')
  @ApiResponse({
    status: 200,
    description: 'Retrieved',
    type: AccountDto,
  })
  @ApiOperation({
    operationId: 'adminGetAccountByEmail',
    summary: 'Get an user account by account email with admin authority',
  })
  async adminGetAccountByEmail(
    @Param() { email }: AdminGetAccountByEmailParam,
  ): Promise<CoreHttpResponse<AccountDto>> {
    const { data } = await this.accountsService.adminGetAccountByEmail(email);
    return CoreHttpResponse.success({
      data,
      message: 'Get account successfully',
    });
  }
}
