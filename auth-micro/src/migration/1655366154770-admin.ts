import { MigrationInterface, QueryRunner } from 'typeorm';

export class admin1655366154770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO auth ("firstName", "lastName", "email", "password", "verifiedEmail", "verificationLink", "roles") VALUES ('Alex', 'Ander', 'alex@gmail.com', '$2b$10$Dbzji4S1matUFgF8MZPuL.lvmuaj8uVeUCoZl/k/knD0KV5M4DtSm', true, 'http://localhost:3000/auth/verify_email/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhAZ21haWwuY29tIiwiaWF0IjoxNjU1MzY3MzQ0LCJleHAiOjE2NTUzNzA5NDR9.JexEpRz9seXAlQMS1Otm6WmEj76eCMLUwUCaP3FILsE', 'ADMIN');`,
    );
    await queryRunner.query(
      `INSERT INTO auth ("firstName", "lastName", "email", "password", "verifiedEmail", "verificationLink", "roles") VALUES ('Anna', 'Lana', 'anna@gmail.com', '$2b$10$Vc7m/ADl.2UKx.n.BJt9N.HjIvLBGeEic5XdGTzddwmpwo15YFenG', true, 'http://localhost:3000/auth/verify_email/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAZ21haWwuY29tIiwiaWF0IjoxNjU1MzY4MzY5LCJleHAiOjE2NTUzNzE5Njl9.4NzS3D9zC0PyyPvbmBViWMdxU-W45qhYtpdJDgBhqG8', 'MASTER');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DELETE from auth where email = 'alex@gmail.com'`);
      await queryRunner.query(`DELETE from auth where email = 'anna@gmail.com'`);
  }
}
