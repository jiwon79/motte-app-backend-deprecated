import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  tag: string;

  @Column()
  location: string;

  @Column()
  channel: string;

  @Column()
  content: string;
}
