import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { Set, Show, Song, SongInstance } from '../models';
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

        // Adding last played to song record
        await this.findLastPlayed(await found.timesPlayed, found);
        const lastPlayed = await found.lastPlayed
        if (lastPlayed) {
            const shows = await Show.find({order: { date: 'DESC' }});

            // Finding currentGap
            let gap = 0;
            shows.every(show => {
                if (show.date === lastPlayed.date) {
                    return false;
                } else {
                    gap++;
                    return true;
                }
            })
            found.currentGap = gap;
        }

        await found.save();
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

    async findLastPlayed(timesPlayed: SongInstance[], song: Song) {
        let lastPlayed: Date = new Date(0);
        let lastPlayedRecord;
        for (const instance of timesPlayed) {
            const set = await instance.set;
            const show = await set.show;

            if (show) {
                if (new Date(show.date) > lastPlayed) {
                    lastPlayed = new Date(show.date);
                    lastPlayedRecord = show;
                }
            }
        }

        if (lastPlayedRecord) {
            song.lastPlayed = lastPlayedRecord;
        }
    }
}
