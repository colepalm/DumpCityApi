import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { Song } from '../models';
import { CreateSongInput, UpdateSongInput } from '../inputs';
import { FindSongInput } from '../inputs/FindSongInput';

@Resolver()
export class SongResolver {
    @Query(() => Song)
    async song(@Arg('song') song: FindSongInput) {
        const found = song.id ?
            await Song.findOne({ where: { id: song.id } }) :
            await Song.findOne({ where: { name: song.name } }})
    }


    @Mutation(() => Song)
    async createSong(@Arg('data') data: CreateSongInput) {
        const song = Song.create({
            name: data.name,
        });
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