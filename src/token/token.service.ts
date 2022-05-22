import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { SignInTdo } from './dto/sign-in.tdo'
import { UserDocument } from '../users/entities/user.entity'

import * as bcrypt from 'bcrypt'

@Injectable()
export class TokenService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(input: SignInTdo) {
    const user = await this.usersService.findOne({ email: input.email })
    return this.JWTGenerator(user)
  }

  async validateUser(
    filter: object,
    password: string
  ): Promise<UserDocument | undefined> {
    const user = await this.usersService.findOne(filter, '')
    if (user && (await this.isMatchPassword(password, user.password))) {
      return user
    }
  }

  async JWTVerify(id: Types.ObjectId): Promise<any> {
    return this.usersService.findOne({ _id: id })
  }

  async JWTGenerator(user: UserDocument) {
    const payload = { id: user.id }
    return this.jwtService.sign(payload)
  }

  async isMatchPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }

  async checkToken(token: string) {
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(
          token.replace('Bearer ', '').trim()
        )
        return this.JWTVerify(payload.id)
      } catch (e) {}
    }
  }
}
