import { MigrationInterface, QueryRunner } from "typeorm";

export class crateUserTable1666363650071 implements MigrationInterface {
    name = 'crateUserTable1666363650071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_tokens_type_enum" AS ENUM('VERIFY_ACCOUNT', 'AUTH', 'REFRESH')`);
        await queryRunner.query(`CREATE TABLE "users_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "token" character varying NOT NULL, "type" "public"."users_tokens_type_enum" NOT NULL, CONSTRAINT "UQ_16796eb52a059007e7e4f5fa72e" UNIQUE ("token"), CONSTRAINT "UQ_c7178ae495d0ae58b04304a54c2" UNIQUE ("user_id", "type"), CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_16796eb52a059007e7e4f5fa72" ON "users_tokens" ("token") `);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "user_name" character varying NOT NULL, "full_name" character varying, "password" character varying NOT NULL, "gender" "public"."users_gender_enum", "avatar" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "user_id" uuid, "post_id" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "title" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4f9a7bd77b489e711277ee598" ON "posts" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "liked_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_b77d1133ff2a16b372c7bb05f7" UNIQUE ("user_id"), CONSTRAINT "PK_02949fcb5ff5f959b875cdbecba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dcd06e0f9f4649ef5d39de33cc" ON "liked_users" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b77d1133ff2a16b372c7bb05f7" ON "liked_users" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "liked_users" ADD CONSTRAINT "FK_dcd06e0f9f4649ef5d39de33ccf" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "liked_users" ADD CONSTRAINT "FK_b77d1133ff2a16b372c7bb05f72" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "liked_users" DROP CONSTRAINT "FK_b77d1133ff2a16b372c7bb05f72"`);
        await queryRunner.query(`ALTER TABLE "liked_users" DROP CONSTRAINT "FK_dcd06e0f9f4649ef5d39de33ccf"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b77d1133ff2a16b372c7bb05f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcd06e0f9f4649ef5d39de33cc"`);
        await queryRunner.query(`DROP TABLE "liked_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4f9a7bd77b489e711277ee598"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16796eb52a059007e7e4f5fa72"`);
        await queryRunner.query(`DROP TABLE "users_tokens"`);
        await queryRunner.query(`DROP TYPE "public"."users_tokens_type_enum"`);
    }

}
