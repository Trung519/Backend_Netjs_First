import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artists } from './artists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
    constructor (
        @InjectRepository(Artists)
        private artistRepository: Repository <Artists>
    ){}

    findArtist(userId: number) :Promise <Artists> {
        console.log(userId);
        return this.artistRepository.findOneBy({user: {id: userId}});
    }
}
