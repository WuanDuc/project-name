/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  sbd: number;

  @Column({ nullable: true, type: 'float' }) // specify type for float values
  toan: number;
  
  @Column({ nullable: true, type: 'float' }) // specify type for float values
  ngu_van: number;
  
  @Column({ nullable: true, type: 'float' }) // specify type for float values
  ngoai_ngu: number;
  
  @Column({ nullable: true, type: 'float' }) // specify type for float values
  vat_li: number;
  
  @Column({ nullable: true, type: 'float' }) // specify type for float values
  hoa_hoc: number;
  
  @Column({ nullable: true, type: 'float' }) // specify type for float values
  sinh_hoc: number;
  
  @Column({ nullable: true, type: 'float' }) // specify type for float values
  lich_su: number;
  
  @Column({ nullable: true, type: 'float' }) // specify type for float values
  dia_li: number;
  
  @Column({ nullable: true, type: 'float' }) // specify type for float values
  gdcd: number;
  
  @Column({ nullable: true, type: 'character varying' })
  ma_ngoai_ngu: string;
}
