import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import {
    SetResolver,
    ShowResolver,
    SongInstanceResolver,
    SongResolver,
    VenueResolver
} from './resolvers';

async function main() {
    const connection = await createConnection();
    connection.synchronize();

    const schema = await buildSchema({
        resolvers: [
            ShowResolver,
            SongResolver,
            SongInstanceResolver,
            VenueResolver,
            SetResolver
        ],
        validate: true
    });
    const server = new ApolloServer({ schema });
    await server.listen(4000);
    console.log('Server has started at port 4000!');
}

main();