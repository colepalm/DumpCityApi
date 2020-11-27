import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { CreateShowInput } from '../inputs';
import { FindShowInput } from '../inputs/show';
import { Show, Set, Venue } from '../models';
import { UpdateSetlistInput } from '../inputs/show/UpdateSetlistInput';
import { Repository } from 'typeorm';

@Resolver()
export class ShowResolver {
    constructor(
        @InjectRepository(Show) private readonly showRepository: Repository<Show>,
        @InjectRepository(Venue) private readonly venueRepository: Repository<Venue>
    ) { }

    @Query(() => Show)
    async show(@Arg('show') show: FindShowInput) {
        const res = await Show.findOne({
            where: [
                { id: show.id },
                { date: show.date }
            ],
        })
        if (!res) throw new Error("Show not found!");
        return res;
    }

    @Query(() => [Show])
    shows() {
        return Show.find()
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
        const show = await Show.findOne({ where: { id: data.id } });
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
}