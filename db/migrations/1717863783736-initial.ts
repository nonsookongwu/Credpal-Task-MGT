import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1717863783736 implements MigrationInterface {
    name = 'Initial1717863783736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "role" "public"."users_role_enum" array NOT NULL DEFAULT '{user}', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
