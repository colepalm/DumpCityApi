import { DumpCityService, PtService } from './services';
import gql from 'graphql-tag';

const pt = new PtService();
const dumpCity = new DumpCityService();

const main = async () => {
    let index = 26;
    while(index > 0) {
        const showsResponse = await pt.client.get(`/bands/9/shows?pageSize=100&page=${index}`);

        for (const show of showsResponse.data) {
            const id = show.id;

            const setlistResponse = await pt.client.get(`/shows/${id}/setlist`);
            console.log(setlistResponse.data);

            const getSong = gql`
                query {
                    
                }
            `
        }
    }
};

main();