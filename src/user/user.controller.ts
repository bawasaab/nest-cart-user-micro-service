import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @MessagePattern('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @MessagePattern('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @MessagePattern('findOneUser')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @MessagePattern('updateUser')
  update(@Param('id') updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Delete(':id')
  @MessagePattern('removeUser')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
