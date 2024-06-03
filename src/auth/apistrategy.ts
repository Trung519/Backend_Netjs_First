import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";

@Injectable()
export class Apistrategy extends PassportStrategy(Strategy) {
    constructor(private apiService: AuthService) { super(); }
    async validate (apikey:string) {
        const user = await this.apiService.validateUserByApi(apikey);
        if (user){
            return user;
        }
        else throw ("Error to find user it is not in database");
    }
}