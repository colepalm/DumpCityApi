import axios from 'axios'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import gql from 'graphql-tag'
import { CreateVenueInput } from '../src/inputs/CreateVenueInput';
import { CreateShowInput } from '../src/inputs/CreateShowInput';

const { buildAxiosFetch } = require("@lifeomic/axios-fetch");

const ptBaseUrl = 'https://www.phantasytour.com/api/bands/9';
const dumpCityBaseUrl = 'http://localhost:4000'

const VENUE_NOT_FOUND = 'Venue not found!'

const ptClient = axios.create({
    baseURL: ptBaseUrl,
    timeout: 1000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

const link = createHttpLink({
    uri: dumpCityBaseUrl,
    fetch: buildAxiosFetch(axios)
})

const dumpCityClient = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

const main = async () => {
    let index = 26;
    while (index > 0) {
        const response = await ptClient.get(`/shows?pageSize=100&page=${index}`)

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
                const res = await dumpCityClient.query({
                    query: getVenue
                });
                if (res.data.venue.id) {
                    await createNewShow({
                        date: show.dateTime,
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
        let res = await dumpCityClient.mutate({
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
        let res = await dumpCityClient.mutate({
            mutation: createShow
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

main();