import { BaseEntity, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { SongInstance } from './SongInstance';
import { Show } from './Show';

@Entity()
@ObjectType()
export class Set extends BaseEntity {
    @Field(_ => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(_ => SongInstance, songInstance => songInstance.set)
    songsPlayed: SongInstance[];

    @ManyToOne(
        _ => Show, show => show.setlist,
        { nullable: false }
    )
    @JoinColumn()
    show: Show;
}