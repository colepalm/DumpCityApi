const axios = require('axios');

const url = 'https://www.phantasytour.com/api/bands/9/shows?pageSize=100&page=1';

const getShows = async () => {
  const shows = await axios.get(url);

  for (const show of shows.data) {
    const { city, state } = getLocale(show.venue.locale);

    const createShowQuery = `mutation {
                               createShow(date: $date,
                                          venue: $venue
                                          city: $city,
                                          state: $state
                                          ) {
                                  id
                                },
                                variables: {
                                   date: ${show.dateTime},
                                   venue: ${show.venue.name},
                                   city: ${city},
                                   state: ${state}
                                }
                              }`;
    try {
      const res = await axios.post('http://localhost:8000/graphql', {
        query: createShowQuery
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