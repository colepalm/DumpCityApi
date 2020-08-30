import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Show } from './Show';

@Entity()
@ObjectType()
export class Song extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ unique: true })
    name: string;

    @Field(() => Show)
    @OneToOne(
        () => Show,
        show => show.id,
        { eager: true, nullable: true}
        )
    firstPlayed: Show;

    @Field(() => Show)
    @OneToOne(
        () => Show,
        show => show.id,
        { eager: true, nullable: true }
        )
    lastPlayed: Show;

    @Field(() => Number)
    @Column({ nullable: true })
    currentGap: number;

    @Field(() => Number)
    @Column()
    timesPlayed: number;
}