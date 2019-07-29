import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken'
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import 'dotenv/config';

import models, { sequelize } from './models'
import resolvers from './resolvers'
import schema from './schema'

const app = express();

app.use(cors());

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

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
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET
    }
  }
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
      role: 'ADMIN',
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


