import { Arg, Mutation, Resolver } from 'type-graphql';

import { CreateSetInput } from '../inputs';
import { Set, Show, SongInstance } from '../models';

@Resolver()
export class SetResolver {
    @Mutation(() => Set)
    async createSet(@Arg('data') data: CreateSetInput) {
        const show = await Show.findOne({ where: { id: data.show }});
        if (!show) throw new Error('Show not found!');

        const setlist: SongInstance[] = [];
        if (data.songsPlayed) {
            for (const songInstance of data.songsPlayed) {
                const instance = await SongInstance.findOne({ where:
                        { id: songInstance }
                });
                if (!instance) throw new Error('Unable to create setlist')
                setlist.push(instance);
            }
        }

        const set = Set.create({
            show: show,
            songsPlayed: setlist
        })
        await set.save();
        return set;
    }
}