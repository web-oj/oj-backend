import "reflect-metadata";
import { BaseEntityWithTimestamps } from "@/entities/Base";
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @Column({ nullable: false, default: false })
  isPublished: boolean;
}
