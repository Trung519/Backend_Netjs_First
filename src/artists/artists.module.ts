import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artists } from './artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artists])],
  providers: [ArtistsService],
  exports: [ArtistsService]
})
export class ArtistsModule {}
