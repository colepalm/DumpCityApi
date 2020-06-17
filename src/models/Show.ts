import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Venue } from './Venue';

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
    @ManyToOne(() => Venue, venue => venue.id)
    venue: Venue;

    @Field(() => Number)
    @Column({ default: 0 })
    rating: number;

    // @OneToMany(() => SongInstance, songInstance => songInstance.id)
    // setlist: SongInstance[];
}