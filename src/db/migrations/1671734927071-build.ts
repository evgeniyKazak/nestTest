import { MigrationInterface, QueryRunner } from "typeorm";

export class build1671734927071 implements MigrationInterface {
    name = 'build1671734927071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`loggedInCounts\` int NOT NULL DEFAULT '0', \`lastLoggedAt\` datetime NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_users\` (\`companyId\` int NOT NULL, \`userId\` int NOT NULL, \`type\` enum ('owner', 'employee') NOT NULL DEFAULT 'owner', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NULL, PRIMARY KEY (\`companyId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`company_users\` ADD CONSTRAINT \`FK_f48efdd06dd9b999ae40c3c96a6\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_users\` ADD CONSTRAINT \`FK_9313a9760bacf83c51e9232c3c3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_users\` ADD CONSTRAINT \`FK_05975e179e12156a442471df4d9\` FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_users\` DROP FOREIGN KEY \`FK_05975e179e12156a442471df4d9\``);
        await queryRunner.query(`ALTER TABLE \`company_users\` DROP FOREIGN KEY \`FK_9313a9760bacf83c51e9232c3c3\``);
        await queryRunner.query(`ALTER TABLE \`company_users\` DROP FOREIGN KEY \`FK_f48efdd06dd9b999ae40c3c96a6\``);
        await queryRunner.query(`DROP TABLE \`company_users\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
