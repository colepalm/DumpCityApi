import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Set } from './Set';
import { Song } from './Song';

@Entity()
@ObjectType()
export class SongInstance extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Song)
    song: Song;

    @Field(() => Number)
    @Column({ type: 'int', nullable: false })
    position: number

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