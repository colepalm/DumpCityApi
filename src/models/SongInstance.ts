import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Show } from './Show';
import { Song } from './Song';

@Entity()
@ObjectType()
export class SongInstance extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Song, song => song.id, { eager: true })
    song: Song;

    @Field(() => Number)
    @Column({ nullable: false })
    setNumber: number

    @Field(() => Number)
    @Column({ nullable: false })
    position: number

    @Field(() => Show)
    @ManyToOne(() => Show, show => show.id, { eager: true })
    show: Show;

    @Field(() => String)
    @Column()
    description: string

    @Field(() => Boolean)
    @Column()
    jamChart: boolean

    @Field(() => String)
    @Column()
    segueType: string
}