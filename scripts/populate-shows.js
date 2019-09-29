const axios = require('axios');

const url = 'https://www.phantasytour.com/api/bands/9/shows?pageSize=100&page=1';

const getShows = async () => {
  const res = await axios.get(url);

  for (const show of res.data) {
    const createShowQuery = `query {
                               mutation{
                                 createShow(date: ${show.dateTime}, venue:)
                                }
                              }`
  }
};

getShows();