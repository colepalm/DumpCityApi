import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import models from './models'
import resolvers from './resolvers'
import schema from './schema'

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

