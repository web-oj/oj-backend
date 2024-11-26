import "reflect-metadata";
import { BaseEntityWithTimestamps } from "./Base";
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Submission } from "./Submission";
import { Testcase } from "./Testcase";
import { ProblemInContest } from "./ProblemInContest";

@Entity("problem")
export class Problem extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  statement: string;

  @Column({ nullable: false })
  difficulty: number;

  @Column({ nullable: false })
  timeLimit: number;

  @Column({ nullable: false })
  memoryLimit: number;

  @Column({ nullable: false, default: "stdin" })
  inputFormat: string;

  @Column({ nullable: false, default: "stdout" })
  outputFormat: string;

  @Column({ nullable: false, default: "" })
  solutionText: string;

  @Column({ nullable: false })
  createdBy: number;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Submission[];

  @OneToMany(() => Testcase, (testcase) => testcase.problem)
  testcases: Testcase[];

  @Column({ nullable: false, default: false })
  isPublished: boolean;

  @OneToMany(
    () => ProblemInContest,
    (problemInContest) => problemInContest.problem,
  )
  associatedContests: ProblemInContest[];
}
