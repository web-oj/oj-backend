import 'reflect-metadata';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, TableForeignKey } from 'typeorm';
import { BaseEntityWithTimestamps } from './Base';
import { User } from './User';
import { Problem } from './Problem';
import { SubmissionResult } from './SubmissionResult';
import { Contest } from './Contest';
import { LANGUAGE } from '../types/types';

@Entity('submission')
export class Submission extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.submissions)
  owner: User;

  @ManyToOne(() => Problem, (problem) => problem.submissions)
  problem: Problem;

  @OneToMany(() => Contest, (contest) => contest.submissions)
  contest: Contest;

  @Column({ type: "mediumtext", nullable: false })
  code: string;

  @Column({ nullable: false })
  language: LANGUAGE;

  @OneToMany(() => SubmissionResult, (submissionResult) => submissionResult.submission)
  result: SubmissionResult[];
}
