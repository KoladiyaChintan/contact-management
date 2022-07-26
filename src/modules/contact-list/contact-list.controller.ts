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
import { User } from '../../decorators/caller.decorator';
import { TransformInterceptor } from '../../dispatcher/transform.interceptor';
import { AdminGuard } from '../../guards/admin.guard';
import { JwtTokenInterface } from '../../interfaces/jwt.token.interface';
import { SuccessResponse } from '../../interfaces/responce.interface';
import { ContactListService } from './contact-list.service';
import { ContactListDto } from './dto/add-contact-list.request.dto';
import { AddContactResponseDto } from './dto/add-contact.response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetContactResponseDto } from './dto/get-contact.response.dto';
import { UpdateContactResponseDto } from './dto/update-contact.response.dto';
import { UpdateContactRequestDto } from './dto/update-contact.request.dto';

@Controller('contact-list')
@UseGuards(AdminGuard)
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth()
@ApiTags('Contact')
export class ContactListController {
  constructor(private readonly contactListService: ContactListService) {}

  @Post('create')
  async create(
    @User() tokenDto: JwtTokenInterface,
    @Body() contactListDto: ContactListDto,
  ): Promise<SuccessResponse<AddContactResponseDto>> {
    const data = await this.contactListService.create(tokenDto, contactListDto);
    return { data: data, message: 'contact add successfully' };
  }

  @Get('getlist')
  async getlist(
    @User() tokenDto: JwtTokenInterface,
  ): Promise<SuccessResponse<GetContactResponseDto>> {
    const data = await this.contactListService.getall(tokenDto);
    return { data: data, message: 'contact list get successfully' };
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @User() tokenDto: JwtTokenInterface,
    @Body() updatecontactDto: UpdateContactRequestDto,
  ): Promise<SuccessResponse<UpdateContactResponseDto>> {
    const data = await this.contactListService.update(
      id,
      tokenDto,
      updatecontactDto,
    );
    return { data: data, message: 'contact update successfully' };
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<SuccessResponse<void>> {
    const data = await this.contactListService.delete(id);
    return { data: data, message: 'contact deleted successfully' };
  }
}
