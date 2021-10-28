import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server';
import { GraphQLScalarType, Kind } from 'graphql';

import {
    SetResolver,
    ShowResolver,
    SongInstanceResolver,
    SongResolver,
    VenueResolver
} from './resolvers';

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
            SetResolver
        ],
        dateScalarMode: 'isoDate',
        validate: true
    });

    return new ApolloServer({
        cors: { origin: '*' },
        schema
    });
}

