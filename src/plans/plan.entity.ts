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

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  channel: string;

  @Column({ nullable: true })
  content: string;
}
