import "reflect-metadata";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";
import {User} from "./User"

export enum ScoringRules {
  IOI = "IOI",
  ICPC = "ICPC",
}

@Entity("contest")
export class Contest extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  ruleText: string;

  @Column({ nullable: false, type: "bigint" })
  startTime: number;

  @Column({ nullable: false, type: "bigint" })
  endTime: number;

  @Column({ nullable: false, type: "enum", enum: ScoringRules, default: "IOI" })
  scoringRule: string;

  @Column({ nullable: false, default: false })
  isPlagiarismCheckEnabled: boolean;

  @Column({ nullable: false, default: false })
  isPublished: boolean;

  @ManyToOne(() => User, (organizer) => organizer.organizedContests)
  organizer: User;
}
