import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    username: string;

    @Field(() => ID)
    @Column({ type: 'varchar', nullable: false })
    email: string;
}
