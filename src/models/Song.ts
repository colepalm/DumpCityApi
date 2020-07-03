import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Song extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({ nullable: true })
    firstPlayed: string;

    @Field(() => String)
    @Column({ nullable: true })
    lastPlayed: string;

    @Field(() => String)
    @Column({ nullable: true })
    currentGap: number;

    @Field(() => Number)
    @Column()
    timesPlayed: number;
}