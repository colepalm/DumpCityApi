import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server';

import {
    SetResolver,
    ShowResolver,
    SongInstanceResolver,
    SongResolver,
    VenueResolver
} from './resolvers';
import { UserResolver } from './resolvers/user/UserResolver';

export async function createApolloServer(): Promise<ApolloServer> {

    const connection = await createConnection();
    connection.synchronize();

    const schema = await buildSchema({
        container: Container,
        resolvers: [
            ShowResolver,
            SongResolver,
            SongInstanceResolver,
            VenueResolver,
            SetResolver,
            UserResolver
        ],
        dateScalarMode: 'isoDate',
        validate: true
    });

    return new ApolloServer({
        cors: {
            origin: ["https://dump-city.web.app"]
        },
        schema
    });
}

