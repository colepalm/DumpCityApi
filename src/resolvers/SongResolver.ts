import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { Set, Song } from '../models';
import { CreateSongInput, UpdateSongInput } from '../inputs';
import { FindSongInput } from '../inputs/FindSongInput';

@Resolver()
export class SongResolver {
    @Query(() => Song)
    async song(@Arg('song') song: FindSongInput) {
        const found = song.id ?
            await Song.findOne({ where: { id: song.id } }) :
            await Song.findOne({ where: { name: song.name } });

        if (!found) throw new Error('Song not found!');

        found.timesPlayed.reduce((a, b) => {
            const set = await Set.findOne({ where: { id: a.set } } );
            return set ? new Date(set.show.date) : 0;
        });

        return found;
    }


    @Mutation(() => Song)
    async createSong(@Arg('data') data: CreateSongInput) {
        const song = Song.create({
            name: data.name,
        });
        song.timesPlayed = [];

        await song.save();
        return song;
    }

    @Mutation(() => Song)
    async updateSong(@Arg('data') data: UpdateSongInput) {
        const song = Song.findOne({ where: { id: data.id }})
        if (!song) throw new Error("Song not found!");
    }
}
