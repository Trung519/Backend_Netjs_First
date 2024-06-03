import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstants } from "./auth-constant";
import { Payload } from "src/types/payload";

@Injectable()
export class JWTstategy extends PassportStrategy(Strategy) {
    constructor () {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConstants.secret,
        });
    }
    async validate (payload:Payload) {
        return {userId: payload.userId, email:payload.email, artistId: payload.artistId};
    }
}