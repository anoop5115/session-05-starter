import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewFi1747998963073 implements MigrationInterface {
  name = "AddedNewFi1747998963073";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ADD "line2" character varying `
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "house_no" character varying `
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "employee_id" character varying `
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP `
    );
    await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
    await queryRunner.query(
      `ALTER TABLE "employee" DROP COLUMN "date_of_joining"`
    );
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
  }
}
