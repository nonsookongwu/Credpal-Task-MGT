import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  label: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
}

export enum TaskStatus {
  STARTED = 'started',
  PENDING = 'pending',
  COMPLETED = 'completed',
}

