import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { User } from '../user/User';
import { Lazy } from '../../interface';
import { Thread } from './Thread';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
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

    @Field(type => Thread, { nullable: false })
    @ManyToOne(
        type => Thread,
        { nullable: false, lazy: true }
    )
    thread: Lazy<Thread>;

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false, default: 'DEFAULT' })
    body: string;
}
