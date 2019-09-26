const axios = require('axios');

const url = 'https://www.phantasytour.com/api/bands/9/shows?pageSize=100&page=1';

const getShows = async () => {
  const res = await axios.get(url);

  for (const show of res.data) {
    const query = `query {
                    mutation(date: ${show.dateTime}, venue:)
                   }`
  }
};

getShows();