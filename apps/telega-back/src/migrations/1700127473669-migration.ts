import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700127473669 implements MigrationInterface {
    name = 'Migration1700127473669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TgUser" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(7)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TgUser" ALTER COLUMN "updatedAt" TYPE TIMESTAMP(6)`);
    }

}
