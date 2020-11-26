import {
    BaseEntity,
    Column,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Venue } from './Venue';
import { Set } from './Set'
import { Lazy } from '../interface';

@Entity()
@ObjectType()
export class Show extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => String)
    @Column({ type: 'varchar' })
    date: string;

    @Field(type => Venue)
    @ManyToOne(type => Venue, { lazy: true })
    @JoinColumn()
    venue: Lazy<Venue>;

    @Field(_ => Number)
    @Column({ type: 'int', default: 0 })
    rating: number;

    @Field(
        type => [Set],
        { nullable: true  }
    )
    @OneToMany(
        type => Set,
        set => set.show,
        { lazy: true, cascade: ['insert'], nullable: true }
    )
    setlist: Lazy<Set[]>;
}