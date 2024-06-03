import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1717294964880 implements MigrationInterface {
    name = 'AddUserPhone1717294964880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "phone" integer NOT NULL`);
    }

}
