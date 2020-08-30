import {
    BaseEntity,
    Column,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Venue } from './Venue';
import { Set } from './Set'
import { Song } from './Song';

@Entity()
@ObjectType()
export class Show extends BaseEntity {
    @Field(_ => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(_ => String)
    @Column()
    date: string;

    @Field(_ => Venue)
    @OneToMany(() => Venue, venue => venue.id, { eager: true })
    venue: Venue;

    @Field(_ => Number)
    @Column({ default: 0 })
    rating: number;

    @OneToMany(_ => Set, set => set.id, { eager: true })
    setlist: Set[];
}