import { BaseEntity, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { SongInstance } from './SongInstance';
import { Show } from './Show';

@Entity()
@ObjectType()
export class Set extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SongInstance, songInstance => songInstance.id)
    songsPlayed: SongInstance[];

    @ManyToOne(() => Show, show => show.id)
    show: Show;
}