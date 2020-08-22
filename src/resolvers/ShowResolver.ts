import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { CreateShowInput } from '../inputs/CreateShowInput';
import { Show } from '../models/Show';
import { Venue } from '../models/Venue';

@Resolver()
export class ShowResolver {
    @Query(() => Show)
    async show(@Arg('id') id: string) {
        return Show.findOne({ where: { id } })
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