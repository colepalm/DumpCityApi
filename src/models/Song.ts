import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Show } from './Show';

@Entity()
@ObjectType()
export class Song extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ unique: true, type: 'varchar' })
    name: string;

    @ManyToOne(() => Show, { nullable: true })
    firstPlayed: Show;

    @ManyToOne(() => Show, { nullable: true })
    lastPlayed: Show;

    @Field(() => Number)
    @Column({ type: 'int', nullable: true })
    currentGap: number;

    @Field(() => Number)
    @Column({ type: 'int' })
    timesPlayed: number;
}