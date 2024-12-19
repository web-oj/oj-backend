import "reflect-metadata";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";
import { Problem } from "./Problem";
import { Contest } from "./Contest";

@Entity("problem_in_contest")
export class ProblemInContest extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @Column()
  contestId: number;

  @ManyToOne(() => Problem, (problem) => problem.associatedContests)
  problem: Problem;

  @ManyToOne(() => Contest, (contest) => contest.problemsInContest)
  contest: Contest;

  @Column({ nullable: false, type: "int", default: 0 })
  score: number;
}
