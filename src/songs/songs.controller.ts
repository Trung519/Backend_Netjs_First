import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
  Inject,
  Scope,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongsDTO } from './dto/create-song-dto';
import { Song } from './song-entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ArtistsGuard } from 'src/artists/arist_guard';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) { }
  @Post()
  @UseGuards(ArtistsGuard)
  create(@Body() createSongDTO: CreateSongsDTO,
  @Req() req
  ): Promise<Song> {
    console.log("---------------", req.user);
    return this.songsService.create(createSongDTO);
  }
  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}
