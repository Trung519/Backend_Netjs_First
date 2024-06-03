import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ArtistsModule } from 'src/artists/artists.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Apistrategy } from './apistrategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
    ArtistsModule,
  ],
  providers: [AuthService, JwtService, Apistrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
