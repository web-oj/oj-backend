import "reflect-metadata";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  Index,
  JoinTable,
} from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";
import { User } from "./User";
import { ContestParticipation } from "./ContestParticipation";
import { ProblemInContest } from "./ProblemInContest";
import { Submission } from "./Submission";

@Entity("contest")
export class Contest extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("title-fulltext-index", { fulltext: true })
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

  @Column({ nullable: false })
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

  @OneToMany(
    () => ContestParticipation,
    (participation) => participation.contest,
  )
  participations: ContestParticipation[];

  @OneToMany(
    () => ProblemInContest,
    (problemInContest) => problemInContest.contest,
  )
  problemsInContest: ProblemInContest[];

  @OneToMany(
    () => Submission,
    (submission) => submission.contest,
  )
  submissions: Submission[];
}
