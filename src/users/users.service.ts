import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import * as bcrypt from 'bcrypt'

import { CreateUserInput } from './dto/create-user.input'
import { User, UserDocument } from './entities/user.entity'
import { UsersFilterInput } from './dto/filter-user.input'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(input: CreateUserInput) {
    const option = {
      createdAt: Date.now(),
      password: await this.hashPassword(input.password)
    }
    return this.userModel.create(Object.assign({}, input, option))
  }

  async findOne(filter: object, exclude = '-password') {
    return this.userModel.findOne(filter).select(exclude)
  }

  async findMany(filter: object, sort: UsersFilterInput) {
    return this.userModel
      .find(filter)
      .skip(sort.skip())
      .limit(sort.limit)
      .select('-password')
  }

  async count(filter: object) {
    return this.userModel.find(filter).countDocuments()
  }

  async update(user: UserDocument, input: object) {
    return this.userModel.findByIdAndUpdate(user._id, input, {
      returnOriginal: false
    })
  }

  async hashPassword(password: string, rounds?: number) {
    return bcrypt.hash(password, rounds || 10)
  }
}
