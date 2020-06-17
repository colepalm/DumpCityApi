import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { ShowResolver } from './resolvers/ShowResolver';
import { VenueResolver } from './resolvers/VenueResolver';

async function main() {
    const connection = await createConnection();
    connection.synchronize();

    const schema = await buildSchema({
        resolvers: [
            ShowResolver,
            VenueResolver
        ],
        validate: false
    });
    const server = new ApolloServer({ schema });
    await server.listen(4000);
    console.log('Server has started!');
}

main();