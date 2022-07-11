import { BaseEntity, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Lazy } from '../../interface';
import { Post } from './Post';
import { User } from '../user/User';

@Entity()
@ObjectType()
export class Thread extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Date)
    @CreateDateColumn()
    createdDate: Date;

    @Field(type => User, { nullable: false })
    @ManyToOne(
        type => User,
        { nullable: false, lazy: true }
    )
    user: Lazy<User>;

    @Field(() => String)
    @OneToMany(
        type => Post,
        instance => instance.thread,
        { lazy: true, cascade: ['insert'], nullable: true }
    )
    posts: Lazy<Post[]>;
}
