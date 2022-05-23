import { Inject, Injectable } from '@nestjs/common'
import { AuthService } from '@comico/auth'
import { JwtService } from '@nestjs/jwt'
import { ClientProxy } from '@nestjs/microservices'

import { Types } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { SignInTdo } from '../users/dto/sign-in.tdo'
import { UserDocument } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class TokenService extends AuthService {
  constructor(
    readonly jwtService: JwtService,
    @Inject('AUTH_SERVICE') readonly client: ClientProxy,
    readonly usersService: UsersService
  ) {
    super(jwtService, client)
  }

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

  async JWTVerify(id: string): Promise<any> {
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
