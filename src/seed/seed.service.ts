import { Injectable } from '@nestjs/common';
import { seeddata } from 'db/seed_data';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(private readonly connection: DataSource) { }
    async seed(): Promise<void> {
        const queueRunner = this.connection.createQueryRunner();
        await queueRunner.connect();
        await queueRunner.startTransaction();
        try {
            const manager = queueRunner.manager;
            await seeddata(manager);
            await queueRunner.commitTransaction();
        }
        catch (err) {
            console.log("Error during database seeding:", err);
            await queueRunner.rollbackTransaction(); // 5
        } finally {
            await queueRunner.release(); //6
        }
    }
}
