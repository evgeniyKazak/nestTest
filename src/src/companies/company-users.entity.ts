import { Users } from 'src/users/users.entity';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Companies } from './companies.entity';

export enum LinkType {
    OWNER = 'owner',
    EMPLOYEE = 'employee',
  }

@Entity()
export class CompanyUsers { 
    
    @PrimaryColumn()
    companyId: number;

    @PrimaryColumn()
    userId: number;

    @Column({
        type: 'enum',
        enum: LinkType,
        default: LinkType.OWNER
    })
    type: LinkType = LinkType.OWNER

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable: true})
    createdBy: number;

    @ManyToOne(type => Companies, company => company.id)
    public company: Companies;

    @ManyToOne(type => Users, user => user.id)
    public user: Users;

    @ManyToOne(type => Users, user => user.id)
    @JoinColumn({ name: "createdBy" })
    public owner: Users; 
}