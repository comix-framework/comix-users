import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { jwtConstants } from './constants'
import { TokenService } from '../token.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected authService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException()
    }
    const user = await this.authService.JWTVerify(payload.id)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
