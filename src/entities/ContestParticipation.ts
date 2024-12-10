import "reflect-metadata";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";
import { User } from "./User";
import { Contest } from "./Contest";

@Entity("contest_participation")
export class ContestParticipation extends BaseEntityWithTimestamps {
  @PrimaryColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  contestId: number;

  @ManyToOne(() => User, (user) => user.participatedContest)
  user: User;

  @ManyToOne(() => Contest, (contest) => contest.participations)
  contest: Contest;

  @Column({ nullable: false, type: "int", default: 0 })
  score: number;
}
