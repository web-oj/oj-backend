import "reflect-metadata";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { BaseEntityWithoutId, BaseEntityWithTimestamps } from "./Base";
import { User } from "./User";
import { Contest } from "./Contest";

@Entity("contest_participation")
export class ContestParticipation extends BaseEntityWithoutId {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  contestId: number;

  @ManyToOne(() => User, (user) => user.contestParticipations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Contest, (contest) => contest.participations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "contestId" })
  contest: Contest;

  @Column({ nullable: false, type: "int", default: 0 })
  score: number;
}
