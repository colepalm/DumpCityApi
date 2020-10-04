import { Arg, Mutation, Resolver } from 'type-graphql';

import { SongInstance, Set, Song } from '../models';
import { CreateSongInstanceInput } from '../inputs';

@Resolver()
export class SongInstanceResolver {
    @Mutation(() => SongInstance)
    async createSongInstance(@Arg('data') data: CreateSongInstanceInput) {
        const song = await Song.findOne({ where: { id: data.song }})
        if (!song) throw new Error("Song not found!");

        const set = await Set.findOne({ where: { id: data.set }})
        if (!set) throw new Error("Set not found!");

        const songInstance = SongInstance.create({
            song: song,
            position: data.position,
            set: set,
            description: data.description,
            jamChart: data.jamChart ? data.jamChart : false,
            segueType: data.segueType
        });
        await songInstance.save();
        return songInstance;
    }
}