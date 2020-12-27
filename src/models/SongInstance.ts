import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Set } from './Set';
import { Song } from './Song';
import { Lazy } from '../interface';

@Entity()
@ObjectType()
export class SongInstance extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(type => Song)
    @ManyToOne(type => Song, { lazy: true, nullable: true })
    song: Lazy<Song>;

    @Field(() => Number)
    @Column({ type: 'int', nullable: false })
    position: number

    @Field(type => Set)
    @ManyToOne(() => Set)
    set: Set;

    @Field(() => String)
    @Column({ type: 'varchar', nullable: true })
    description: string

    @Field(() => Boolean)
    @Column({ type: 'bool', nullable: true })
    jamChart: boolean

    @Field(() => String)
    @Column({ type: 'varchar', nullable: true })
    segueType: string
}