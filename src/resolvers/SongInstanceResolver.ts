import { Arg, Mutation, Resolver } from 'type-graphql';

import { SongInstance, Set, Song } from '../models';
import { CreateSongInstanceInput } from '../inputs';

@Resolver()
export class SongInstanceResolver {
    @Mutation(() => SongInstance)
    async createSongInstance(@Arg('data') data: CreateSongInstanceInput) {
        const song = await Song.findOne({ where: { id: data.song }})
        if (!song) throw new Error("Show not found!");

        const set = await Set.findOne({ where: { id: data.set }})
        if (!set) throw new Error("Show not found!");

        const songInstance = SongInstance.create({
            setNumber: data.setNumber,
            position: data.position,
            set: set,
            description: data.description,
            jamChart: data.jamChart ? data.jamChart : false
        });
        await songInstance.save();
        return songInstance;
    }
}