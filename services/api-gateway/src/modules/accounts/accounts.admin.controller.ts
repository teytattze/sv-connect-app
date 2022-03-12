import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccountDto, AdminGetAccountByEmailParam } from '@sv-connect/domain';
import { AccountsService } from './accounts.service';

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
    @Param() params: AdminGetAccountByEmailParam,
  ): Promise<AccountDto> {
    return await this.accountsService.adminGetAccountByEmail(params.email);
  }
}
