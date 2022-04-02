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
  CoreHttpResponse,
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
  async indexAccount(): Promise<CoreHttpResponse<AccountDto[]>> {
    const { data } = await this.accountsService.indexAccounts();
    return CoreHttpResponse.success({ data });
  }

  @Post('create')
  @ApiResponse({
    status: 200,
    description: 'Created',
    type: AccountDto,
  })
  @ApiOperation({
    operationId: 'createAccount',
    summary: 'Create a new user account',
  })
  async createAccount(
    @Body() { email, password, emailVerified, role }: CreateAccountBody,
  ): Promise<CoreHttpResponse<AccountDto>> {
    const { data } = await this.accountsService.createAccount({
      email,
      password,
      emailVerified,
      role,
    });
    return CoreHttpResponse.success({ data });
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
    @Param() { email }: GetAccountByEmailParam,
  ): Promise<CoreHttpResponse<AccountDto>> {
    const { data } = await this.accountsService.getAccountByEmail(email);
    return CoreHttpResponse.success({ data });
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
    @Param() { id }: GetAccountByIdParam,
  ): Promise<CoreHttpResponse<AccountDto>> {
    const { data } = await this.accountsService.getAccountById(id);
    return CoreHttpResponse.success({ data });
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
    @Param() { id }: UpdateAccountByIdParam,
    @Body() { email, emailVerified, password }: UpdateAccountBody,
  ): Promise<CoreHttpResponse<AccountDto>> {
    const { data } = await this.accountsService.updateAccountById(id, {
      email,
      emailVerified,
      password,
    });
    return CoreHttpResponse.success({ data });
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
  async deleteAccountById(
    @Param() { id }: DeleteAccountByIdParam,
  ): Promise<CoreHttpResponse<null>> {
    await this.accountsService.deleteAccountById(id);
    return CoreHttpResponse.success({
      message: 'Account deleted successfully',
    });
  }
}
