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
import { Testcase } from "./Testcase";

@Entity("submission_result")
export class SubmissionResult extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Submission, (submission) => submission.result)
  submission: Submission;

  @ManyToOne(() => Testcase, (testcase) => testcase.id)
  testcase: Testcase;

  @Column({ nullable: false })
  result: string;
}
