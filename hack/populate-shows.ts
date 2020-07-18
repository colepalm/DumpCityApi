import axios from 'axios'
import { gql } from '@apollo/client';

const ptBaseUrl = 'https://www.phantasytour.com/api/bands/9';
// TODO: Figure out deployment
// const dumpCityBaseUrl: ''

const ptClient = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

// const dumpCityClient = axios.create({
//     baseUrl
// })

const getShows = async () => {
    const response = await ptClient.get('/shows?pageSize=100&page=26')

    //TODO: Maybe add interfaces here?
    response.data.forEach((show: any) => {
        const getVenue = gql`
            query venue(
                venue: {
                    city: show.city,
                    name: show.name
                }
            ) { id }
        `

        // const response = await client.get()
    })
}

getShows();