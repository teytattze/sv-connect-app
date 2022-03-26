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
  CoreApiResponse,
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
  async indexAccount(): Promise<CoreApiResponse<AccountDto[]>> {
    const { data } = await this.accountsService.indexAccounts();
    return CoreApiResponse.success(data, 'Accounts indexed successfully');
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
  ): Promise<CoreApiResponse<AccountDto>> {
    const { data } = await this.accountsService.createAccount({
      email,
      password,
      emailVerified,
      role,
    });
    return CoreApiResponse.success(data, 'Account created successfully');
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
  ): Promise<CoreApiResponse<AccountDto>> {
    const { data } = await this.accountsService.getAccountByEmail(email);
    return CoreApiResponse.success(data, 'Account retrieved successfully');
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
  ): Promise<CoreApiResponse<AccountDto>> {
    const { data } = await this.accountsService.getAccountById(id);
    return CoreApiResponse.success(data, 'Account retrieved successfully');
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
  ): Promise<CoreApiResponse<AccountDto>> {
    const { data } = await this.accountsService.updateAccountById(id, {
      email,
      emailVerified,
      password,
    });
    return CoreApiResponse.success(data, 'Account updated successfully');
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
  ): Promise<CoreApiResponse<null>> {
    await this.accountsService.deleteAccountById(id);
    return CoreApiResponse.success(null, 'Account deleted successfully');
  }
}
