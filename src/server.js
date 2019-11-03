import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken'
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import * as dotenv from "dotenv";
import http from 'http';
import DataLoader from "dataloader";

import models, { sequelize } from './models'
import resolvers from './resolvers'
import schema from './schema'
import loaders from "./loaders";

const app = express();

app.use(cors());

const env = dotenv.config().parsed ? dotenv.config().parsed : process.env;

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
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
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 8000;

const isTest = !!process.env.TEST_DATABASE;

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createUsersWithMessages(new Date());
  }

  httpServer.listen(PORT, () => {
    console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
  });
});

const createUsersWithMessages = async date => {
  await models.User.create(
    {
      username: 'cpalm',
      email: 'palm.cole@gmail.com',
      password: 'cpalm12',
      role: 'ADMIN',
      messages: [
        {
          text: 'DumpCityApi Creator',
          createdAt: date.setSeconds(date.getSeconds() + 1),
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
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
        {
          text: 'Blahgs',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};


