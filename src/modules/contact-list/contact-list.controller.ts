import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/decorators/caller.decorator';
import { TransformInterceptor } from 'src/dispatcher/transform.interceptor';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { SuccessResponse } from 'src/interfaces/responce.interface';
import { ContactListService } from './contact-list.service';
import { ContactListDto } from './dto/contact-list.dto';
import { AddcontactResponce } from './dto/contact.responce.dto';

@Controller('contact-list')
@UseGuards(AdminGuard)
@UseInterceptors(TransformInterceptor)
export class ContactListController {
  constructor(private readonly contactListService: ContactListService) {}

  @Post('create')
  async create(
    @User() tokenDto: JwtTokenInterface,
    @Body() contactListDto: ContactListDto,
  ): Promise<SuccessResponse<AddcontactResponce>> {
    const data = await this.contactListService.create(tokenDto, contactListDto);
    return { data };
  }

  @Get('getlist')
  async getlist(
    @User() tokenDto: JwtTokenInterface,
  ): Promise<SuccessResponse<any>> {
    const data = await this.contactListService.getall(tokenDto);
    return { data };
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() contactListDto: ContactListDto,
  ): Promise<SuccessResponse<any>> {
    const data = await this.contactListService.update(id, contactListDto);
    return { data };
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<SuccessResponse<any>> {
    const data = await this.contactListService.delete(id);
    return { data };
  }
}
