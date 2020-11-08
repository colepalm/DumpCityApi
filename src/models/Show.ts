import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Venue } from './Venue';
import { Set } from './Set'

@Entity()
@ObjectType()
export class Show extends BaseEntity {
    @Field(_ => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(_ => String)
    @Column()
    date: string;

    @OneToMany(
        _ => Venue,
        venue => venue.shows,
        { eager: true, nullable: true }
    )
    @JoinColumn()
    venue: Venue;

    @Field(_ => Number)
    @Column({ default: 0 })
    rating: number;

    @OneToMany(
        type => Set,
        set => set.show,
        { nullable: true }
    )
    @Field(type => Set)
    setlist: Set;
}