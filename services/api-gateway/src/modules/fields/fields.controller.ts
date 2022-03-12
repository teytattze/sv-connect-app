import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFieldBody, FieldDto } from '@sv-connect/domain';
import { FieldsService } from './fields.service';

@ApiTags('Fields')
@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post('create')
  async createField(@Body() body: CreateFieldBody): Promise<FieldDto> {
    return await this.fieldsService.createField(body);
  }
}
