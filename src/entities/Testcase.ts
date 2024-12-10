import "reflect-metadata";
import { BaseEntityWithTimestamps } from "./Base";
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Submission } from "./Submission";
import { Problem } from "./Problem";
import { SubmissionResult } from "./SubmissionResult";

@Entity("testcase")
export class Testcase extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Problem, (problem) => problem.testcases)
  problem: Problem;

  @Column({ nullable: false })
  input: string;  

  @Column({ nullable: false })
  output: string;
}
