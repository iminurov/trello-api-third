import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsString, MaxLength } from "class-validator";
import { EventEntity } from "../event/event.entity";


@Entity()
export class MonitorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString({ always: true })
  @Column()
  userId: string;

  @IsString({ always: true })
  @Column()
  eventId: string;

  @IsString({ always: true })
  @Column()
  name: string;

  @IsDate({ always: true })
  @Column()
  createAt: string;

  @IsDate({ always: true })
  @Column()
  updateAt: string;

  @ManyToOne(() => EventEntity, (event) => event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })

  // @OneToOne()
  public event: EventEntity;

}
