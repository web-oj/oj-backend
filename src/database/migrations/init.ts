import { MigrationInterface, QueryRunner } from "typeorm"

export class InitDatabase implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {    
    await queryRunner.query(
      `INSERT INTO "user" (handle, email, password, role, is_ban) VALUES ('admin', '
      admin@example, 'admin', 'admin', false)`
    )
  } 

  async down(queryRunner: QueryRunner): Promise<void> {
  }
}