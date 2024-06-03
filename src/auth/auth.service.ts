import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/Login_sto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Payload } from 'src/types/payload';
import { Enable2FAType } from 'src/types/authtype';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { User } from 'src/users/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    disable2FA(userId: any): Promise<UpdateResult> {
        throw new Error('Method not implemented.');
    }
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private artistService: ArtistsService,
        private configService: ConfigService
    ) { }

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string } | { validate2FA: string, message: string }> {
        const user = await this.userService.findOne(loginDTO);
        const passwordmatched = await bcrypt.compare(loginDTO.password, user.password);
        if (passwordmatched) {
            // if (user.enable2FA && user.twoFASecret)
            //     return { //2.
            //         validate2FA: 'http://localhost:3000/auth/vertified-2fa',
            //         message:
            //             'Please send the one-time password/token from your Google Authenticator App',
            //     };
            const payload: Payload = { email: user.email, userId: user.id }
            const artist = this.artistService.findArtist(user.id);

            //COMMENT FIX CODE NOT NEEDESSARY

            // if (await artist) console.log('xxxxxxxxxxxxxx', artist);
            // else console.log("ERROR in authservice.ts");

            if (artist) payload.artistId = (await artist).id;
            return { accessToken: this.jwtService.sign(payload) }
        }
        throw ("Password is not match");
    }
    //------- use to authenciation 2 factor 
    async enable2FA(userId: number): Promise<Enable2FAType> {
        const user = await this.userService.findUserById(userId);
        console.log("--------------zzzzzzzzzzzz", user);

        if (user.enable2FA) {
            return { secret: user.twoFASecret };
        }
        const secret = speakeasy.generateSecret();
        user.twoFASecret = secret.base32;
        await this.userService.updateSecretKey(userId, user.twoFASecret);
        return { secret: user.twoFASecret };
    }

    async diasble2FA_auth(userId: number): Promise<UpdateResult> {
        return this.userService.disable2FA(userId);
    }

    async validate2FAToken(userId: number, token: string): Promise<{ vertified: boolean }> {
        try {
            const user = this.userService.findUserById(userId);
            const vertified = speakeasy.totp.verify(
                {
                    secret: (await user).twoFASecret,
                    token: token,
                    encoding: 'base32'
                }
            )
            if (vertified) return { vertified: true };
            else return { vertified: false }
        }
        catch (err) {
            throw ("error when validate OPT in file auth.service.ts");
        }
    }

    //USER FOR API
    async validateUserByApi(apikey: string) :Promise<User>{
        return this.userService.findbyApi(apikey);
    }

    // Configuration :
    getEnvVariable() {
        return this.configService.get<number>('port');
      }
}
