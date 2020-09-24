import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Show } from './Show';

@Entity()
@ObjectType()
export class Venue extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column()
    city: string;

    @Field(() => String)
    @Column()
    state: string;

    @Field(() => String)
    @Column()
    country: string;

    @Field(() => Number)
    @Column({ default: 0 })
    timesPlayed: number;

    @OneToOne(() => Show, show => show.id)
    firstTime: Show;

    @OneToOne(() => Show, show => show.id)
    lastTime: Show;

    @ManyToOne(
        _ => Show, show => show.venue,
        { nullable: true }
        )
    shows: Show[]
}