import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPlanTable1644698842735 implements MigrationInterface {
  name = 'createPlanTable1644698842735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "plan" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "title" varchar NOT NULL, "tag" varchar NOT NULL, "location" varchar NOT NULL, "channel" varchar NOT NULL, "content" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "plan"`);
  }
}
