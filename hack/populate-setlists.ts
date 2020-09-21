import { DumpCityService, PtService } from './services';
import gql from 'graphql-tag';

const pt = new PtService();
const dumpCity = new DumpCityService();

const main = async () => {
    let index = 26;
    while(index > 0) {
        const showsResponse = await pt.client.get(`/bands/9/shows?pageSize=100&page=${index}`);

        for (const show of showsResponse.data) {
            const dcShow = await getShow(show.dateTime);

            const setlistResponse = await pt.client.get(`/shows/${show.id}/setlist`);

            for (const song of setlistResponse.data.ShowSongs) {
                const songId = getSong(song.Song.Name);
                if (songId) {
                    createSongInstance()
                }
            }
        }
    }
};

const getShow = async (id: string) => {
    const getShowQuery = gql`
        query { show(id: "${id}") { id } }
    `

    const res = await dumpCity.client.query({
        query: getShowQuery
    });
    return res.data.id;
}

const getSong = async (song: string) => {
    const getSongQuery = gql`
        query {
            song(song: { name: "${song}" })
            { id }
        }
    `

    try {
        let res = await dumpCity.client.query({
            query: getSongQuery
        })
        return res.data.id
    } catch (error) {
        console.log(error)
    }
}

const createSongInstance = async () => {

}

main();