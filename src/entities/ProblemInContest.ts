import "reflect-metadata";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { BaseEntityWithoutId } from "./Base";
import { Problem } from "./Problem";
import { Contest } from "./Contest";

@Entity("problem_in_contest")
export class ProblemInContest extends BaseEntityWithoutId {
  @PrimaryColumn()
  problemId: number;

  @PrimaryColumn()
  contestId: number;

  @ManyToOne(() => Problem, (problem) => problem.associatedContests, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "problemId" })
  problem: Problem;

  @ManyToOne(() => Contest, (contest) => contest.associatedProblems, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "contestId" })
  contest: Contest;

  @Column({ nullable: false, type: "int", default: 0 })
  score: number;
}
