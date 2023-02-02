import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { User } from '../user/User';
import { Lazy } from '../../interface';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Post, { nullable: true })
    @ManyToOne(
        type => Post,
        { nullable: true, lazy: true }
    )
    parent: Lazy<Post>;

    @Field(() => Date)
    @CreateDateColumn()
    createdDate: Date;

    @Field(type => User, { nullable: false })
    @ManyToOne(
        type => User,
        { nullable: false, lazy: true }
    )
    user: Lazy<User>;

    @Field(type => [Post], { nullable: true })
    @OneToMany(
        _ => Post,
        instance => instance.parent,
        { lazy: true, nullable: true }
    )
    comments: Lazy<Post[]>;

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false, default: 'DEFAULT' })
    body: string;

    @Field(() => Number)
    @Column({ type: 'int', default: 0 })
    likes: number;
}
