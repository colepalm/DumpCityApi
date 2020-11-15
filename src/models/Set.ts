import { BaseEntity, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { SongInstance } from './SongInstance';
import { Show } from './Show';

@Entity()
@ObjectType()
export class Set extends BaseEntity {
    @Field(_ => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        _ => SongInstance,
        songInstance => songInstance.set,
        { eager: true }
    )
    @Field(type => [SongInstance])
    songsPlayed: SongInstance[];

    @ManyToOne(
        type => Show,
        show => show.setlist,
        { eager: true, nullable: false }
    )
    @Field(type => Show)
    show: Show;

    // TODO: Propagate this through existing sets to not violate constraint
    @Field(_ => Number, { nullable: false })
    setNumber: number;
}