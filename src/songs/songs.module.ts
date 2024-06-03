import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song-entity';
import { Artists } from 'src/artists/artists.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Song, Artists])],
  controllers: [SongsController],
  providers: [
    SongsService
  ],
})
export class SongsModule {}
