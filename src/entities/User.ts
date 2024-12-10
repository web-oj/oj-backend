import 'reflect-metadata';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityWithTimestamps } from './Base';
import { Submission } from './Submission';
import { Contest } from './Contest';
import { Role } from '../types/types';
import { Problem } from './Problem';
import { ContestParticipation } from './ContestParticipation';

@Entity('user')
export class User extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  handle: string;

  @Column({ nullable: true })
  avatar_image: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: Role;

  @Column({ nullable: false, default: false })
  isBan: boolean;

  @Column({ nullable: true, type: 'bigint' })
  lastTimeChangeHandle: number;

  @Column({ nullable: true, type: 'bigint' })
  lastTimeChangeImage: number;

  @Column({ nullable: true })
  country: string;  // Optional country for regional ranking purposes

  @OneToMany(() => Problem, (problem) => problem.owner)
  problems: Problem[];

  @OneToMany(() => Submission, (submission) => submission.owner)
  submissions: Submission[];

  @OneToMany(() => Contest, (contest) => contest.organizer)
  organizedContests: Contest[];

  @OneToMany(() => ContestParticipation, (contest) => contest.user)
  participatedContest: ContestParticipation[];
}
