import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, JwtFromRequestFunction, Strategy } from "passport-jwt";
import { JwtPayload, JwtPayloadWithRefreshToken } from "src/common/types";

export const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  if (req && req.cookies) {
    return req.cookies["refresh_token"];
  }
  return null;
};

@Injectable()
export class RefreshTokenFromCookieStrategy extends PassportStrategy(
  Strategy,
  "refresh-jwt"
) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = req.cookies.refresh_token;
  
    if (!refreshToken) {
      throw new ForbiddenException("Refresh token notogri");
    }
    console.log(refreshToken);
    
    if(!(refreshToken.role == "admin")){
      throw new UnauthorizedException("Unauthorized Admin");
    }
    return { ...payload, refreshToken };
  }
}
