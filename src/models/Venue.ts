import {
    BaseEntity,
    Column,
    Entity, JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Show } from './Show';
import { Lazy } from '../interface';

@Entity()
@ObjectType()
export class Venue extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => String)
    @Column({ type: 'varchar' })
    name: string;

    @Field(type => String)
    @Column({ type: 'varchar' })
    city: string;

    @Field(type => String)
    @Column({ type: 'varchar' })
    state: string;

    @Field(type => String)
    @Column({ type: 'varchar' })
    country: string;

    @Field(type => Number)
    @Column({ type: 'int', default: 0 })
    timesPlayed: number;

    @Field(type => Show)
    @OneToOne(type => Show, { lazy: true })
    firstTime: Lazy<Show>;

    @Field(type => Show)
    @OneToOne(type => Show, { lazy: true })
    lastTime: Lazy<Show>;

    @Field(type => [Show])
    @OneToMany(
        type => Show,
        show => show.venue,
        { lazy: true, cascade: ['insert'] }
        )
    shows: Lazy<Show[]>
}