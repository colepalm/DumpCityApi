import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Show } from './Show';
import { SongInstance } from './SongInstance';

@Entity()
@ObjectType()
export class Song extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ unique: true, type: 'varchar' })
    name: string;

    @Field(type => Show)
    @ManyToOne(() => Show, { nullable: true })
    firstPlayed: Show;

    @Field(type => Show)
    @ManyToOne(() => Show, { nullable: true })
    lastPlayed: Show;

    @Field(() => Number)
    @Column({ type: 'int', nullable: true })
    currentGap: number;

    @Field(type => [SongInstance], { nullable: true })
    @OneToMany(
        type => SongInstance,
        instance => instance.song,
        { lazy: true, cascade: ['insert'], nullable: true }
    )
    timesPlayed: SongInstance[];
}