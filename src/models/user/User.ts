import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Post } from '../forum';

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

    @Field(() => [Post])
    @ManyToMany(
        type => Post,
        post => post.likers,
        { lazy: true, cascade: ['insert'], nullable: true }
    )
    likes: [Post];
}
