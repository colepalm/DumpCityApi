import gql from 'graphql-tag'

import { CreateShowInput, CreateVenueInput } from '../src/inputs';
import { DumpCityService, PtService } from './services';

const VENUE_NOT_FOUND = 'Venue not found!'

const pt = new PtService();
const dumpCity = new DumpCityService();

const main = async () => {
    let index = 27;
    while(index > 0) {
        const response = await pt.client.get(`/bands/9/shows?pageSize=100&page=${index}`)

        for (const show of response.data) {
            const city = show.venue.locale.substr(0, show.venue.locale.indexOf(','));
            const state = show.venue.locale.split(',')[1];
            const getVenue = gql`
                query {
                    venue(venue: {
                        city: "${city}",
                        name: "${show.venue.name}"
                    }) {
                        id
                    }
                }
            `
            try {
                const res = await dumpCity.client.query({
                    query: getVenue
                });
                if (res.data.venue.id) {
                    await createNewShow({
                        date: new Date(show.dateTime).toDateString(),
                        venue: res.data.venue.id
                    })
                }
            } catch (err) {
                if (err.message === VENUE_NOT_FOUND) {
                    const venueId = await createNewVenue({
                        name: show.venue.name,
                        city: city,
                        state: state,
                        country: 'USA'
                    })
                    await createNewShow({
                        date: show.dateTime,
                        venue: venueId
                    })
                }
            }
        }

        index = index - 1;
    }
}


const createNewVenue = async (venue: CreateVenueInput) => {
    const createVenue = gql`
        mutation {
          createVenue(
            data: {
              name: "${venue.name}",
              city: "${venue.city}",
              state: "${venue.state}",
              country: "${venue.country}",  
            }
          ) {
            id
          }
        }
    `

    try {
        let res = await dumpCity.client.mutate({
            mutation: createVenue
        });
        return res.data.createVenue.id
    } catch (err) {
        console.log(err)
    }
}

const createNewShow = async (show: CreateShowInput) => {
    const createShow = gql`
        mutation {
            createShow(
                data: {
                    date: "${show.date}",
                    venue: "${show.venue}"
                }
            ) {
                id
            }
        }
    `

    try {
        const res = await dumpCity.client.mutate({
            mutation: createShow
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

main();
