import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import * as bcrypt from 'bcrypt'

import { User, UserDocument } from './entities/user.entity'
import { SignUpTdo } from './dto/sign-up.tdo'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(input: SignUpTdo) {
    const option = {
      createdAt: Date.now(),
      password: await this.hashPassword(input.password)
    }
    return this.userModel.create(Object.assign({}, input, option))
  }

  async findOne(filter: object, exclude = '-password') {
    return this.userModel.findOne(filter).select(exclude)
  }

  async hashPassword(password: string, rounds?: number) {
    return bcrypt.hash(password, rounds || 10)
  }
}
