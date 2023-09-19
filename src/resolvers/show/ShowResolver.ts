import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { Show, Set, Venue } from '../../models/show';
import { User } from '../../models/user';
import {
    CreateShowInput,
    FindShowInput,
    UpdateAttendeeInput,
    UpdateSetlistInput
} from '../../inputs/show';
import { PaginationInput } from '../../inputs';

@Resolver()
export class ShowResolver {
    constructor(
        @InjectRepository(Show) private readonly showRepository: Repository<Show>,
        @InjectRepository(Venue) private readonly venueRepository: Repository<Venue>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    @Query(() => Show)
    async show(@Arg('show') show: FindShowInput) {
        const res = await this.showRepository.findOne({
            where: [
                { id: show.id },
                { date: show.date }
            ],
        })
        if (!res) throw new Error("Show not found!");
        return res;
    }

    @Query(() => [Show])
    async shows(
        @Arg("pagination", { nullable: true })
            pagination?: PaginationInput
    ) {
        // TODO: Figure out how to filter out shows without setlists
        return await this.showRepository.find({
            take: pagination?.take || 10,
            order: { date: 'DESC' },
            skip: pagination?.skip || 0,
        })
    }

    @Query(() => [Show])
    async showsByYear(
        @Arg("year", { nullable: false })
            year: Number
    ) {
        return await this.showRepository
            .createQueryBuilder('show')
            .where('EXTRACT(YEAR FROM show.date) = :year', { year })
            .getMany();
    }

    @Mutation(() => Show)
    async createShow(@Arg('data') data: CreateShowInput) {
        const venue = await this.venueRepository.findOne(
            data.venue,
            { relations: ['shows'] }
        );
        if (!venue) throw new Error("Venue not found!");
        const show = this.showRepository.create({ date: data.date, venue });
        await show.save();
        return show;
    }

    @Mutation(() => Show)
    async updateSetlist(@Arg('data') data: UpdateSetlistInput) {
        const show = await this.showRepository.findOne({ where: { id: data.id } });
        if (!show) throw new Error("Show not found!");

        const setlist: Set[] = []
        for (const set of data.setlist) {
            const instance = await Set.findOne(
                { where: { id: set }}
            );
            if (!instance) throw new Error('Unable to update setlist')
            setlist.push(instance);
        }

        show.setlist = setlist;
        await show.save();
        return show;
    }

    @Mutation(() => Show)
    async updateAttendees(@Arg('data') data: UpdateAttendeeInput) {
        const user = await this.userRepository.findOne({ where: { id: data.user } })
        const show = await this.showRepository.findOne({ where: { id: data.show } })

        if (!user) throw new Error("User not found!");
        if (!show) throw new Error("Show not found!");

        const attendees = await show.attendees;

        if (!attendees) {
            show.attendees = [user];
        } else {
            if (attendees.filter(u => u.id === user.id).length === 0) {
                (await show.attendees).push(user)
                console.log(`Adding user to attendees ${user.id}, show ${show.id}`)
            } else {
                const index = attendees.indexOf(user);
                (await show.attendees).splice(index, 1);
                console.log(`Removing user from attendees ${user.id}, show ${show.id}`)
            }
        }

        await show.save();
        console.log(`Saved attendee toggle user ${user.id}, show ${show.id}`)
    }
}
