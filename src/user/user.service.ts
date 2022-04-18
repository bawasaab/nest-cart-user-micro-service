import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async findAll() {
    try {
      const user = await this.userModel.find().exec();
      if (!user) {
        throw new NotFoundException('Users not found');
      }
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async findOne(id: ObjectId) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findById(id).exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      if (updateUserDto.email) {
        updatedUser.email = updateUserDto.email;
      }
      if (updateUserDto.password) {
        updatedUser.password = updateUserDto.password;
      }
      if (updateUserDto.role) {
        updatedUser.role = updateUserDto.role;
      }
      return updatedUser.save();
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.userModel.findOne(id);
      const user = await this.userModel.deleteOne({ _id: id }).exec();
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }
}
