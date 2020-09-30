import gql from 'graphql-tag';

import { CreateSongInstanceInput } from '../src/inputs';
import { DumpCityService, PtService } from './services';

const pt = new PtService();
const dumpCity = new DumpCityService();

const main = async () => {
    let index = 26;
    while(index > 0) {
        const showsResponse = await pt.client.get(`/bands/9/shows?pageSize=100&page=${index}`);

        for (const show of showsResponse.data) {
            const dcShowId = await getShow(show.dateTime);

            const setlistResponse = await pt.client.get(`/shows/${show.id}/setlist`);

            const songsPlayed = [];

            for (const song of setlistResponse.data.ShowSongs) {
                const songId = await getSong(song.Song.Name);
                if (songId) {
                    const songInstanceId = await createSongInstance({
                        song: songId,
                        setNumber: song.Song.SetNumber,
                        position: song.Song.Position,
                        segueType: song.Song.Segue ? '>' : '',
                        show: dcShowId
                    });
                    songsPlayed.push(songInstanceId);
                }
            }
        }
    }
};

const getShow = async (date: string) => {
    const getShowQuery = gql`
        query {
            show(show: { date: "${date}" }) { id } 
        }
    `

    try {
        const res = await dumpCity.client.query({
            query: getShowQuery
        });
        return res.data.show.id;
    } catch (err) {
        console.log(err);
    }
}

const getSong = async (name: string) => {
    const getSongQuery = gql`
        query {
            song(song: { name: "${name}" })
            { id }
        }
    `

    try {
        let res = await dumpCity.client.query({
            query: getSongQuery
        })
        return res.data.song.id
    } catch (error) {
        return await createSong(name)
    }
}

const createSong = async (name: string) => {
    const createSongMutation = gql`
        mutation {
            createSong(data: { name: "${name}" }) { id }
        }
    `

    try {
        let res = await dumpCity.client.mutate({
            mutation: createSongMutation
        })
        console.log(res.data.createSong)
    } catch (err) {
        console.log(err);
    }
}

const createSongInstance = async (songInstance: CreateSongInstanceInput) => {
    const createSongInstanceMutation = gql`
        mutation {
            createSongInstance(data: "${songInstance}") { id }
        }
    `
    try {
        let res = await dumpCity.client.mutate({
            mutation: createSongInstanceMutation
        })
        return res.data.createSongInstance.id

    } catch (err) {
        console.log(err)
    }
}

main();