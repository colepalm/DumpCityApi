import gql from 'graphql-tag';

import { CreateSetInput, CreateSongInstanceInput } from '../src/inputs';
import { DumpCityService, PtService } from './services';
import { UpdateSetlistInput } from '../src/inputs/show/UpdateSetlistInput';

const pt = new PtService();
const dumpCity = new DumpCityService();

const main = async () => {
    let index = 27;
    while(index > 0) {
        const showsResponse = await pt.client.get(`/bands/9/shows?pageSize=100&page=${index}`);

        for (const show of showsResponse.data) {
            const dcShowId = await getShow(show.dateTime);

            const setlistResponse = await pt.client.get(`/shows/${show.id}/setlist`);

            let songsPlayed = [];
            const setsCovered = new Set();
            let currentSetId = '';
            let sets: string[] = [];

            // Create setlist
            for (const song of setlistResponse.data.ShowSongs) {
                if (!setsCovered.has(song.SetNumber)) {
                    currentSetId = await createSet(
                        {show: dcShowId, setNumber: song.SetNumber}
                    );
                    setsCovered.add(song.SetNumber);
                }

                const songId = await getSong(song.Song.Name.replace(/["]+/g, ''));
                if (songId) {
                    const songInstanceId = await createSongInstance({
                        song: songId,
                        set: currentSetId,
                        position: song.Position,
                        segueType: song.Segue ? '>' : '',
                    }, song.Song.Name.replace(/["]+/g, ''));
                    songsPlayed.push(songInstanceId);
                }

                if (setsCovered.size !== sets.length) {
                    console.log('\x1b[45m', '\n\n***UPDATED SET***')
                    console.log('Set ID: ', await updateSet(currentSetId, songsPlayed));
                    sets.push(currentSetId);
                    songsPlayed = [];
                }
            }

            updateSetlist({id: dcShowId, setlist: sets})
        }
        index = index - 1;
    }
};

// ASYNC GQL FUNCTIONS
const getShow = async (date: string) => {
    const dateString = date.substr(0,10);
    const getShowQuery = gql`
        query {
            show(show: { date: "${dateString}" }) { id } 
        }
    `

    try {
        const res = await dumpCity.client.query({
            query: getShowQuery
        });
        console.log('\x1b[43m', '\n\n***SHOW FOUND***')
        console.log('Show ID:' , res.data.show.id)
        console.log('Show Date:' , date)
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
    if (name.indexOf('"') >= 0) {
        console.log('\x1b[46m', '\n\n***SONG NOT CREATED***')
        console.log('Song name: ', name)
    } else {
        const createSongMutation = gql`
            mutation {
                createSong(data: { name: "${name}" }) { id }
            }
        `

        try {
            let res = await dumpCity.client.mutate({
                mutation: createSongMutation
            })
            console.log('\x1b[46m', '\n\n***NEW SONG***')
            console.log('Song ID: ', res.data.createSong)
            console.log('Song name: ', name)
        } catch (err) {
            console.log(err);
        }
    }
}

const createSongInstance = async (songInstance: CreateSongInstanceInput, name: string) => {
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
        console.log('\x1b[46m', '\n\n***NEW SONG INSTANCE***')
        console.log('Song Instance ID: ', res.data.createSongInstance.id)
        console.log('Song: ', name)
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
    const songsString: string = createStringArray(songsPlayed);
    const updateSetMutation = gql`
        mutation {
            updateSet(data: {
                id: "${id}",
                songsPlayed: [${songsString}]
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
};

const updateSetlist = async (updatedShow: UpdateSetlistInput) => {
    const setsString: string = createStringArray(updatedShow.setlist);

    const updateSetlistMutation = gql`
        mutation {
            updateSetlist(data: {
                id: "${updatedShow.id}",
                setlist: [${setsString}]
            }) { id }
        }
      `;

    try {
        let res = await dumpCity.client.mutate({
            mutation: updateSetlistMutation
        })
        return res.data.updateSetlist.id

    } catch (err) {
        console.log(err)
    }
};

// UTILS
const createStringArray = (arr: any[]): string => {
    let stringArray: string = '';
    arr.forEach((song: string, index: number, array: string[]) => {
        index === array.length - 1 ?
            stringArray += `"${song}"` :
            stringArray += `"${song}", `;
    });
    return stringArray;
};

main();
