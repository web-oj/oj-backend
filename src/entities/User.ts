import 'reflect-metadata';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityWithTimestamps } from './Base';
import { Submission } from './Submission';

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
  role: string;

  @Column({ nullable: false, default: false })
  isBan: boolean;

  @Column({ nullable: true, type: 'bigint' })
  lastTimeChangeHandle: number;

  @Column({ nullable: true, type: 'bigint' })
  lastTimeChangeImage: number;

  @Column({ nullable: true })
  country: string;  // Optional country for regional ranking purposes

  @OneToMany(() => Submission, (submission) => submission.owner)
  submissions: Submission[];
}
