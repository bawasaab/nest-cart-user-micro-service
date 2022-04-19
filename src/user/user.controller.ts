import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @EventPattern('createUser')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @MessagePattern({ cmd: 'findAllUser' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @MessagePattern({ cmd: 'findOneUser' })
  async findOne(@Body('id') id: ObjectId) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @EventPattern('updateUser')
  async update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Delete(':id')
  @EventPattern('removeUser')
  async remove(@Body() id: ObjectId) {
    return this.userService.remove(id);
  }
}
