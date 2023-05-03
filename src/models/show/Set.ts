import { BaseEntity, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { SongInstance } from './SongInstance';
import { Show } from './Show';
import { Lazy } from '../../interface';

@Entity()
@ObjectType()
export class Set extends BaseEntity {
    @Field(_ => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => [SongInstance], { nullable: true })
    @OneToMany(
        _ => SongInstance,
        songInstance => songInstance.set,
        { lazy: true, cascade: ['insert'], nullable: true }
    )
    songsPlayed: Lazy<SongInstance[]>;

    @Field(type => Show)
    @ManyToOne(type => Show, { nullable: true, lazy: true })
    show: Lazy<Show>;

    @Field(_ => Number)
    @Column({ type: 'int', nullable: true })
    setNumber: number;
}
