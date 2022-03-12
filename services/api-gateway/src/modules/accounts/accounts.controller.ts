import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AccountDto,
  CreateAccountBody,
  DeleteAccountByIdParam,
  GetAccountByEmailParam,
  GetAccountByIdParam,
  UpdateAccountByIdParam,
  UpdateAccountBody,
} from '@sv-connect/domain';
import { AccountsService } from './accounts.service';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Index',
    type: AccountDto,
    isArray: true,
  })
  @ApiOperation({
    operationId: 'indexAccounts',
    description: 'Index all user accounts',
  })
  async indexAccount(): Promise<AccountDto[]> {
    return await this.accountsService.indexAccounts();
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Created',
    type: AccountDto,
  })
  @ApiOperation({
    operationId: 'registerAccount',
    summary: 'Register a new user account',
  })
  async registerAccount(@Body() body: CreateAccountBody): Promise<AccountDto> {
    return await this.accountsService.registerAccount(body);
  }

  @Get('emails/:email')
  @ApiResponse({
    status: 200,
    description: 'Retrieved',
    type: AccountDto,
  })
  @ApiOperation({
    operationId: 'getAccountByEmail',
    summary: 'Get an user account by account email',
  })
  async getAccountByEmail(
    @Param() param: GetAccountByEmailParam,
  ): Promise<AccountDto> {
    return await this.accountsService.getAccountByEmail(param.email);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retrieved',
    type: AccountDto,
  })
  @ApiOperation({
    operationId: 'getAccountById',
    summary: 'Get an user account by account id',
  })
  async getAccountById(
    @Param() param: GetAccountByIdParam,
  ): Promise<AccountDto> {
    return await this.accountsService.getAccountById(param.id);
  }

  @Put('update/:id')
  @ApiResponse({
    status: 200,
    description: 'Updated',
    type: AccountDto,
  })
  @ApiOperation({
    operationId: 'updateAccountById',
    summary: 'Update an user account by account id',
  })
  async updateAccountById(
    @Param() param: UpdateAccountByIdParam,
    @Body() body: UpdateAccountBody,
  ): Promise<AccountDto> {
    return await this.accountsService.updateAccountById(param.id, body);
  }

  @Delete('delete/:id')
  @ApiResponse({
    status: 200,
    description: 'Deleted',
  })
  @ApiOperation({
    operationId: 'deleteAccountById',
    summary: 'Delete an user account by account id',
  })
  async deleteAccountById(@Param() param: DeleteAccountByIdParam) {
    await this.accountsService.deleteAccountById(param.id);
    return { status: 200, message: 'Account deleted successfully' };
  }
}
