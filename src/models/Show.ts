import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Venue } from './Venue';
import { Set } from './Set'

@Entity()
@ObjectType()
export class Show extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    date: string;

    @Field(() => Venue)
    @ManyToOne(() => Venue, venue => venue.id, { eager: true })
    venue: Venue;

    @Field(() => Number)
    @Column({ default: 0 })
    rating: number;

    @OneToMany(() => Set, set => set.id, { eager: true })
    setlist: Set[];
}