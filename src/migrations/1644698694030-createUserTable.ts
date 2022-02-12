import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1644698694030 implements MigrationInterface {
  name = 'createUserTable1644698694030';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY, 
        "name" varchar NOT NULL, 
        "email" varchar NOT NULL, 
        "password" varchar NOT NULL
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
