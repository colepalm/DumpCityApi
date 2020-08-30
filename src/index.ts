import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { ShowResolver } from './resolvers/ShowResolver';
import { VenueResolver } from './resolvers/VenueResolver';
import { SongInstanceResolver } from './resolvers/SongInstanceResolver';
import { SongResolver } from './resolvers/SongResolver';

async function main() {
    const connection = await createConnection();
    connection.synchronize();

    const schema = await buildSchema({
        resolvers: [
            ShowResolver,
            SongResolver,
            SongInstanceResolver,
            VenueResolver
        ],
        validate: true
    });
    const server = new ApolloServer({ schema });
    await server.listen(4000);
    console.log('Server has started at port 4000!');
}

main();