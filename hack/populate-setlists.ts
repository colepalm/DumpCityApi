import gql from 'graphql-tag';

import { CreateSetInput, CreateShowInput, CreateSongInstanceInput } from '../src/inputs';
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

            let songsPlayed = [];
            const setsCovered = new Set();
            let currentSetId = '';

            // Create setlist
            for (const song of setlistResponse.data.ShowSongs) {
                if (setsCovered.has(song.SetNumber)) {
                    const songId = await getSong(song.Song.Name);
                    if (songId) {
                        const songInstanceId = await createSongInstance({
                            song: songId,
                            set: currentSetId,
                            position: song.Position,
                            segueType: song.Segue ? '>' : '',
                        });
                        songsPlayed.push(songInstanceId);
                    }
                } else {
                    // Add setlist to set when currentSet is filled
                    if (currentSetId) {
                        console.log(songsPlayed);
                        const setId = await updateSet(currentSetId, songsPlayed);
                        console.log(setId);
                        songsPlayed = [];
                    }

                    currentSetId = await createSet(
                        { show: dcShowId, setNumber: song.SetNumber }
                    )
                    setsCovered.add(song.SetNumber);
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
            createSongInstance(data: {
                song: "${songInstance.song}",
                position: ${songInstance.position},
                set: "${songInstance.set}",
                segueType: "${songInstance.segueType}"
            }) { id }
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

const createSet = async (set: CreateSetInput) => {
    const createSetMutation = gql`
        mutation {
            createSet(data: { 
                show: "${set.show}", setNumber: ${set.setNumber}
            }) { id }
        }
    `;

    try {
        let res = await dumpCity.client.mutate({
            mutation: createSetMutation
        })
        return res.data.createSet.id

    } catch (err) {
        console.log(err)
    }
}

const updateSet = async (id: string, songsPlayed: string[]) => {
    let songsString: string = '';
    songsPlayed.forEach(song => songsString += `${song}`);
    const updateSetMutation = gql`
        mutation {
            updateSet(data: {
                id: "${id}",
                songsPlayed: ${songsString}
            }) { id }
        }
    `;

    try {
        let res = await dumpCity.client.mutate({
            mutation: updateSetMutation
        })
        return res.data.updateSet.id

    } catch (err) {
        console.log(err)
    }
}

main();