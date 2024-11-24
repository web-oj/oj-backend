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

@Entity("testcase")
export class Testcase extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Problem, (problem) => problem.testcases)
  problem: Problem;
}
