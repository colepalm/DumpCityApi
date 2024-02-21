import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Post } from '../forum';
import { Lazy } from '../../interface';
import { Show } from '../show';

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    username: string;

    @Field(() => String)
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    email: string;

    @Field(_ => [Post])
    @ManyToMany(
        type => Post,
        { lazy: true,  nullable: true }
    )
    @JoinTable()
    likes: Lazy<Post[]>;

    @Field(_ => [Show])
    @ManyToMany(
        _ => Show,
        show => show.attendees,
        { lazy: true, nullable: true }
    )
    myShows: Lazy<Show[]>
}
