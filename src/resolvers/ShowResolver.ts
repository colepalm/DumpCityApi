import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { CreateShowInput } from '../inputs';
import { FindShowInput } from '../inputs/show';
import { Show, Venue } from '../models';

@Resolver()
export class ShowResolver {
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
        const venue = await Venue.findOne({ where: { id: data.venue } });
        if (!venue) throw new Error("Venue not found!");
        const show = Show.create({ date: data.date, venue });
        await show.save();
        return show;
    }
}