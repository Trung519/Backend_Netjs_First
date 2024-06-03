import { User } from 'src/users/user.entity';
import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { Artists } from 'src/artists/artists.entity';

export const seeddata = async (manager: EntityManager): Promise<void> => {
  //1
  // Add your seeding logic here using the manager
  // For example:

  await seedUser();
  await seedArtist();

  async function seedUser() {
    //2
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstname = faker.person.firstName();
    user.lastname = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apikey = uuid4();

    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstname = faker.person.firstName();
    user.lastname = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apikey = uuid4();

    const artist = new Artists();
    artist.user = user;
    await manager.getRepository(User).save(user);
    await manager.getRepository(Artists).save(artist);
  }

};
