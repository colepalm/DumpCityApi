import { Arg, Mutation, Resolver } from 'type-graphql';

import { Song } from '../models/Song';
import { CreateSongInput } from '../inputs/CreateSongInput';
import { UpdateSongInput } from '../inputs/UpdateSongInput';

@Resolver()
export class SongResolver {
    @Mutation(() => Song)
    async createSong(@Arg('data') data: CreateSongInput) {
        const song = Song.create(data);
        song.timesPlayed = 0;

        await song.save();
        return song;
    }

    @Mutation(() => Song)
    async updateSong(@Arg('data') data: UpdateSongInput) {
        const song = Song.findOne({ where: { id: data.id }})
        if (!song) throw new Error("Song not found!");


    }
}