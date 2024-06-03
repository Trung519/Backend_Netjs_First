import { Artists } from 'src/artists/artists.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Artists, artists => artists.song, { cascade: true })
  @JoinTable({ name: 'artist_song' })
  artists: Artists[];


  @Column('date')
  releaseDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;
}
