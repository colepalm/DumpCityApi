import {
    BaseEntity,
    Column,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Venue } from './Venue';
import { Set } from './Set'
import { Lazy } from '../../interface';
import { User } from '../user';

@Entity()
@ObjectType()
export class Show extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => String)
    @Column({ type: 'date', nullable: true })
    date: Date;

    @Field(type => Venue)
    @ManyToOne(type => Venue, { lazy: true })
    venue: Lazy<Venue>;

    @Field(_ => Number)
    @Column({ type: 'int', default: 0 })
    rating: number;

    @Field(_ => [Set], { nullable: true  })
    @OneToMany(
        type => Set,
        set => set.show,
        { lazy: true, cascade: ['insert'], nullable: true }
    )
    setlist: Lazy<Set[]>;

    @Field(_ => [User])
    @ManyToMany(
        _ => User,
        user => user.myShows,
        { lazy: true, nullable: true }
    )
    @JoinTable()
    attendees: Lazy<User[]>;
}
