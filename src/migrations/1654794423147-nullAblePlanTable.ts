import { MigrationInterface, QueryRunner } from 'typeorm';

export class nullAblePlanTable1654794423147 implements MigrationInterface {
  name = 'nullAblePlanTable1654794423147';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_plan" (
        "id" SERIAL PRIMARY KEY, 
        "date" varchar NOT NULL, 
        "title" varchar NOT NULL, 
        "tag" varchar NOT NULL, 
        "location" varchar, 
        "channel" varchar, 
        "content" varchar
      )`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_plan"("id", "date", "title", "tag", "location", "channel", "content") SELECT "id", "date", "title", "tag", "location", "channel", "content" FROM "plan"`,
    );
    await queryRunner.query(`DROP TABLE "plan"`);
    await queryRunner.query(`ALTER TABLE "temporary_plan" RENAME TO "plan"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plan" RENAME TO "temporary_plan"`);
    await queryRunner.query(
      `CREATE TABLE "plan" (
        "id" SERIAL PRIMARY KEY, 
        "date" varchar NOT NULL, 
        "title" varchar NOT NULL, 
        "tag" varchar NOT NULL, 
        "location" varchar NOT NULL, 
        "channel" varchar NOT NULL, 
        "content" varchar NOT NULL
      )`,
    );
    await queryRunner.query(
      `INSERT INTO "plan"("id", "date", "title", "tag", "location", "channel", "content") SELECT "id", "date", "title", "tag", "location", "channel", "content" FROM "temporary_plan"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_plan"`);
  }
}
