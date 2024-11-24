import 'reflect-metadata';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableForeignKey } from 'typeorm';
import { BaseEntityWithTimestamps } from './Base';
import { User } from './User';
import { Problem } from './Problem';

export type LANGUAGE = 'CPP' | 'C' | 'JAVA' | 'PYTHON';

@Entity('submission')
export class Submission extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.submissions)
  owner: User;

  @ManyToOne(() => Problem, (problem) => problem.submissions)
  problem: Problem;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  language: LANGUAGE;

  @Column({ nullable: false })
  executionResult: string;
}
