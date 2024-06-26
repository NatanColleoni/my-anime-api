import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create.user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.userHash(createUserDto.password);
    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    return this.userModel.findOne({ email: createUserDto.email }).select('-password');
  }

  findOne(email: string) {
    const findedUser = this.userModel.findOne({ email: email });
    return findedUser;
  }

  findAll() {
    const findedUsers = this.userModel.find().select('-password');
    return findedUsers;
  }

  private async userHash(pass) {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltOrRounds);
    return hashedPass;
  }
}
