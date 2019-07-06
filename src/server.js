import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';

import models, { sequelize } from './models'
import resolvers from './resolvers'
import schema from './schema'

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async () => ({
    models,
    me: await models.User.findByLogin('cpalm'),
    secret: process.env.SECRET
  })
});

server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 5000;

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'cpalm',
      email: 'palm.cole@gmail.com',
      password: 'cpalm12',
      messages: [
        {
          text: 'DumpCityApi Creator',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'mwarren',
      email: 'showcountmike@gmail.com',
      password: 'mwarren1',
      messages: [
        {
          text: 'Curating stuff',
        },
        {
          text: 'Blahgs',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};


