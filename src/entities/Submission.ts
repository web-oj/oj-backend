import 'reflect-metadata';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableForeignKey } from 'typeorm';
import { BaseEntityWithTimestamps } from './Base';
import { User } from './User';

@Entity('submission')
export class Submission extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.submissions)
  owner: User;

  @Column({ nullable: false })
  problem: string;

  @Column({ nullable: false })
  code: string;
}
