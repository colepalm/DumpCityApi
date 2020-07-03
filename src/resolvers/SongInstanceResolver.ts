import { Arg, Mutation, Resolver } from 'type-graphql';

import { SongInstance } from '../models/SongInstance';
import { CreateSongInstanceInput } from '../inputs/CreateSongInstanceInput';
import { Show } from '../models/Show';

@Resolver()
export class SongInstanceResolver {
    @Mutation(() => SongInstance)
    async createSongInstance(@Arg('data') data: CreateSongInstanceInput) {
        const song = await Show.findOne({ where: { id: data.song }})
        if (!song) throw new Error("Show not found!");

        const show = await Show.findOne({ where: { id: data.show }})
        if (!show) throw new Error("Show not found!");

        const songInstance = SongInstance.create({
            setNumber: data.setNumber,
            position: data.position,
            show: show,
            description: data.description,
            jamChart: data.jamChart ? data.jamChart : false
        });
        await songInstance.save();
        return songInstance;
    }
}