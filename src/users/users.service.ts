import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from "bcryptjs";
import { LoginDTO } from 'src/auth/dto/Login_sto';
import { v4 as uuid4 } from "uuid";

//THIS IS NOT API
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }
    async create(userDTO: CreateUserDTO): Promise<User> {
        //THIS IS NOT HAVE API, IF YOU PLEASE COMMENT BELOW CODE

        // const salt = await bcrypt.genSalt();
        // userDTO.password = await bcrypt.hash(userDTO.password, salt);
        // const user = this.userRepository.save(userDTO);
        // delete (await user).password;
        // return user;
        const user = new User();
        user.firstname = userDTO.firstname;
        user.lastname = userDTO.lastname;
        user.email = userDTO.email;
        user.apikey = uuid4();
        const salt = await bcrypt.genSalt(); 
        user.password = await bcrypt.hash(userDTO.password, salt);

        const saveuser = this.userRepository.save(user);
        delete (await saveuser).password;
        return saveuser;

    }
    async findOne(data: Partial<User>): Promise<User> {
        const userlogin = this.userRepository.findOneBy({ email: data.email })
        if (!userlogin) {
            throw ('Could not find user');
        }
        return userlogin;
    }

    async findUserById(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id: id });
    }

    async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
        return this.userRepository.update(
            { id: userId },
            {
                twoFASecret: secret,
                enable2FA: true
            }
        )
    }
    async disable2FA(userId): Promise<UpdateResult> {
        return this.userRepository.update(
            { id: userId },
            {
                twoFASecret: null,
                enable2FA: false
            }
        )
    }

    async findbyApi (apikey:string) :Promise<User> {
        return this.userRepository.findOneBy({apikey});
    }
}
