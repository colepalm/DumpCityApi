import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { CreateSetInput, UpdateSetInput } from '../inputs';
import { Set, Show, SongInstance } from '../models';

@Resolver()
export class SetResolver {
    @Query(() => Set)
    async set(@Arg('id') id: string) {
        const set = await Set.findOne({ where: { id } });

        if (!set) throw new Error('Set not found!');
        return set;
    }

    @Mutation(() => Set)
    async createSet(@Arg('data') data: CreateSetInput) {
        const show = await Show.findOne({ where: { id: data.show }});
        if (!show) throw new Error('Show not found!');

        const setlist: SongInstance[] = [];
        if (data.songsPlayed) {
            for (const songInstance of data.songsPlayed) {
                const instance = await SongInstance.findOne(songInstance);
                if (!instance) throw new Error('Unable to create setlist')
                setlist.push(instance);
            }
        }

        const set = Set.create({
            show: show,
            songsPlayed: setlist,
            setNumber: data.setNumber
        })
        await set.save();
        return set;
    }

    @Mutation(() => Set)
    async updateSet(@Arg("data") data: UpdateSetInput) {
        const set = await Set.findOne({ where: { id: data.id } });
        if (!set) throw new Error('Set not found!');
        const setlist: SongInstance[] = [];
        for (const song of data.songsPlayed) {
            const foundSongInstance = await SongInstance.findOne(
                { where: { id: song } }
                )
            if (!foundSongInstance)
                throw new Error(`Unable to create setlist: ${song}`)

            setlist.push(foundSongInstance);
        }

        set.songsPlayed = setlist;
        await set.save();
        return set;
    }
}