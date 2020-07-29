import axios from 'axios'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import gql from 'graphql-tag'
import { CreateVenueInput } from '../src/inputs/CreateVenueInput';

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

const getShows = async () => {
    const response = await ptClient.get('/shows?pageSize=100&page=26')

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
            console.log(res);
        } catch (err) {
            if (err.message === VENUE_NOT_FOUND) {
                createNewVenue({
                    name: show.venue.name,
                    city: city,
                    state: state,
                    country: 'USA'
                })
            }
        }
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
    const res = await dumpCityClient.mutate({
        mutation: createVenue
    });
    console.log(res);
}

getShows();