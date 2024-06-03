import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/Login_sto';
import { Enable2FAType } from 'src/types/authtype';
import { JWTAuthGuard } from './jwt-guard';
import { UpdateResult } from 'typeorm';
import { ValidateToken } from './dto/OPT_dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) { }
    @Post('Signup')
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({
        status: 201,
        description: 'It will return the user in the response',
    })
    signup(
        @Body() userDTO: CreateUserDTO
    ): Promise<User> {
        return this.userService.create(userDTO);
    }
    @Post('Login')
    login(@Body() loginDTO: LoginDTO) {
        console.log(loginDTO);
        return this.authService.login(loginDTO);
    }

    @Post('enable-2fa')
    @UseGuards(JWTAuthGuard)
    enable2FA(
        @Req() req
    ): Promise<Enable2FAType> {
        console.log(req.user);
        return this.authService.enable2FA(req.user.userId);
    }

    @Get('disable-2fa')
    @UseGuards(JWTAuthGuard)
    disable2FA(
        @Req()
        req,
    ): Promise<UpdateResult> {
        return this.authService.diasble2FA_auth(req.user.userId);
    }

    @Post('vertified-2fa')
    @UseGuards(JWTAuthGuard)
    vertified(
        @Req() req,
        @Body() OPTdto: ValidateToken
    ): Promise<{ vertified: boolean }> {
        return this.authService.validate2FAToken(req.user.userId, OPTdto.token);
    }

    @Get('profile_api')
    @UseGuards(AuthGuard('bearer'))
    getprofile(
        @Req() req) {
        delete req.user.password;
        return {
            mgs: "THIS IS AUTHENCIATION BY API",
            user: req.user
        };
    }

    @Get('test_config')
    testEnv() {
        return this.authService.getEnvVariable();
    }

}
