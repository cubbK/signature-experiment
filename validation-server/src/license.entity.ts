import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class License {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  license: string;

  @Column({nullable: true})
  pcUsed?: string;
}