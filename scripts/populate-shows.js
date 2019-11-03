const gql = require('apollo-server-express').gql;

const axios = require('axios');

const url = 'https://www.phantasytour.com/api/bands/9/shows?pageSize=100&page=25';

const getShows = async () => {
  const shows = await axios.get(url);

  for (const show of shows.data) {
    const { city, state } = getLocale(show.venue.locale);

    try {
      const createShowQuery = gql`mutation {
          createShow(
              date: "${show.dateTime}",
              venueName: "${show.venue.name}",
              city: "${city}",
              state: "${state}"
              country: "United States"
          ) { id }
      }`;

      const res = await axios.post('https://dump-city-api.herokuapp.com/graphql', {
        query: createShowQuery.loc.source.body
      });
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }
};


const getLocale = (locale) => {
  const comma = locale.indexOf(',');
  const city = locale.slice(0, comma);
  const state = locale.substring(comma + 2);

  return { city, state };
};

getShows();