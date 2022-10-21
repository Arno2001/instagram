import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrateUserTable1666370181521 implements MigrationInterface {
  name = 'crateUserTable1666370181521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_tokens_type_enum" AS ENUM('VERIFY_ACCOUNT', 'AUTH', 'REFRESH')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "token" character varying NOT NULL, "type" "public"."users_tokens_type_enum" NOT NULL, CONSTRAINT "UQ_16796eb52a059007e7e4f5fa72e" UNIQUE ("token"), CONSTRAINT "UQ_c7178ae495d0ae58b04304a54c2" UNIQUE ("user_id", "type"), CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_16796eb52a059007e7e4f5fa72" ON "users_tokens" ("token") `,
    );
    await queryRunner.query(
      `CREATE TABLE "followers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "following_user_id" uuid NOT NULL, CONSTRAINT "REL_dd746422070b9a89efb891a7a8" UNIQUE ("following_user_id"), CONSTRAINT "PK_c90cfc5b18edd29bd15ba95c1a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6e6e6be11ffefd40e60bffbeb" ON "followers" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dd746422070b9a89efb891a7a8" ON "followers" ("following_user_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "user_name" character varying NOT NULL, "full_name" character varying, "password" character varying NOT NULL, "gender" "public"."users_gender_enum", "avatar" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_d6e6e6be11ffefd40e60bffbebd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_dd746422070b9a89efb891a7a89" FOREIGN KEY ("following_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "followers" DROP CONSTRAINT "FK_dd746422070b9a89efb891a7a89"`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" DROP CONSTRAINT "FK_d6e6e6be11ffefd40e60bffbebd"`,
    );
    await queryRunner.query(`DROP TABLE "liked_users"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c4f9a7bd77b489e711277ee598"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dd746422070b9a89efb891a7a8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d6e6e6be11ffefd40e60bffbeb"`,
    );
    await queryRunner.query(`DROP TABLE "followers"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_16796eb52a059007e7e4f5fa72"`,
    );
    await queryRunner.query(`DROP TABLE "users_tokens"`);
    await queryRunner.query(`DROP TYPE "public"."users_tokens_type_enum"`);
  }
}
