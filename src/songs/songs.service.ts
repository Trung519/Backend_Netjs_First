import { Inject, Injectable, Scope } from '@nestjs/common';
import { Connection, connection } from '../common/constants/connection';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song-entity';
import { CreateSongsDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from './dto/update-song.dto';
import { Artists } from 'src/artists/artists.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRespository: Repository<Song>,
        @InjectRepository(Artists)
        private artistsRepository:Repository<Artists>
    ) { }
    async create(songDTO: CreateSongsDTO): Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releaseDate = songDTO.releaseDate;

        console.log(songDTO.artists);

        const artist = await this.artistsRepository.findByIds(songDTO.artists);

        song.artists = artist;
        return  this.songRespository.save(song);
    }
    findAll(): Promise<Song[]> {
        return this.songRespository.find();
    }
    findOne(id: number): Promise<Song> {
        return this.songRespository.findOneBy({ id });
    }
    remove(id: number): Promise<DeleteResult> {
        return this.songRespository.delete(id);
      }
    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songRespository.update(id, recordToUpdate);
    }
}
