import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { CompanyUsers } from './company-users.entity';

@Entity()
export class Companies {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn() 
    updatedAt: Date;

    @OneToMany(type => CompanyUsers, user => user.company)
    users: CompanyUsers[];
}