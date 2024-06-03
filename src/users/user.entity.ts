import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: "Jane",
        description: "Provide the first name of the user",
    })
    @Column()
    firstname: string;


    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    //This is 2 factor authenciation
    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;

    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;

    //now we identify the entity by API:
    @Column()
    apikey: string;
}