import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Show } from './Show';

@Entity()
@ObjectType()
export class SongInstance extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    // @ManyToOne(() => Song, song => song.id)
    // song: Song;

    @Field(() => Number)
    @Column({ nullable: false })
    setNumber: number

    @Field(() => Number)
    @Column({ nullable: false })
    position: number

    @Field(() => Show)
    @ManyToOne(() => Show, show => show.id)
    show: Show;

    @Field(() => String)
    @Column()
    description: string

    @Field(() => Boolean)
    @Column()
    jamChart: boolean
}