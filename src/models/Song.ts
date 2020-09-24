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
    @Column({ unique: true })
    name: string;

    @ManyToOne(
        () => Show,
        show => show.id
        )
    firstPlayed: Show;

    @ManyToOne(
        () => Show,
        show => show.id,
        )
    @JoinColumn()
    lastPlayed: Show;

    @Field(() => Number)
    @Column({ nullable: true })
    currentGap: number;

    @Field(() => Number)
    @Column()
    timesPlayed: number;
}