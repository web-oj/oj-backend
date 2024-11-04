import "reflect-metadata";
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";
import { User } from "./User";
import { ContestParticipation } from "./ContestParticipation";

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

  @ManyToOne(() => User, (user) => user.organizedContests, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  organizer: User;

  @OneToMany(() => ContestParticipation, (participation) => participation.contest)
  participations: ContestParticipation[];
}
