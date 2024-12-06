import "reflect-metadata";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  Index,
} from "typeorm";
import { BaseEntityWithTimestamps } from "./Base";
import { User } from "./User";

@Entity("achievement")
export class Achievement extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToOne(
    () => User,
    (user) => user.achievements,
  )
  @JoinColumn({ name: "achievement_id" }) 
  belongsTo: User;
 
}
