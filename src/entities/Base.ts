import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseEntityWithTimestamps extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: "deleted_at",
  })
  deletedAt: Date;
}

export class BaseEntityWithoutId extends BaseEntity {
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: "deleted_at",
  })
  deletedAt: Date;
}
