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
import { ObjectId } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @MessagePattern('createUser')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @MessagePattern('findAllUser')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @MessagePattern('findOneUser')
  async findOne(@Param('id') id: ObjectId) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @MessagePattern('updateUser')
  async update(@Param() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Delete(':id')
  @MessagePattern('removeUser')
  async remove(@Param('id') id: ObjectId) {
    return this.userService.remove(id);
  }
}
