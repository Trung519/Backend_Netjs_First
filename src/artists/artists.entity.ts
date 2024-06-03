import { Song } from "src/songs/song-entity";
import { User } from "src/users/user.entity";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Artists')
export class Artists {
    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=>User)
    @JoinColumn()
    user:User;

    @ManyToMany(
        ()=>Song, song => song.artists
    )
    song: Song[];
}