import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { CreateVenueInput } from '../inputs/CreateVenueInput';
import { Venue } from '../models/Venue';
import { UpdateVenueInput } from '../inputs/UpdateVenueInput';
import { FindVenueInput } from '../inputs/FindVenueInput';

@Resolver()
export class VenueResolver {
    @Query(() => Venue)
    async venue(@Arg('venue') venue: FindVenueInput) {
        const found = venue.id ?
            await Venue.findOne({ where: { id: venue.id } }) :
            await Venue.findOne({ where:
                    {
                        city: venue.city,
                        name: venue.name
                    }
            })

        if (!found) throw new Error('Venue not found!')

        return found;
    }

    @Query(() => [Venue])
    venues() {
        return Venue.find()
    }

    @Mutation(() => Venue)
    async createVenue(@Arg('data') data: CreateVenueInput) {
        const venue = Venue.create(data);
        await venue.save()
        return venue;
    }

    @Mutation(() => Venue)
    async updateVenue(@Arg("id") id: string, @Arg("data") data: UpdateVenueInput) {
        const venue = await Venue.findOne({ where: { id } });
        if (!venue) throw new Error("Venue not found!");
        venue.timesPlayed = data.addOne ?
            venue.timesPlayed + 1 :
            data.timesPlayed;
        await venue.save();
        return venue;
    }

    @Mutation(() => Boolean)
    async deleteVenue(@Arg('id') id: string) {
        const venue = await Venue.findOne({ where: { id } });
        if (!venue) throw new Error("Venue not found!");
        await venue.remove();
        return true;
    }
}