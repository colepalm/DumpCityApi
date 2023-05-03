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
} from './resolvers/show';
import { UserResolver } from './resolvers/user/UserResolver';
import { PostResolver } from './resolvers/forum';

export async function createApolloServer(): Promise<ApolloServer> {

    const connection = await createConnection();
    connection.synchronize();

    const schema = await buildSchema({
        container: Container,
        resolvers: [
            PostResolver,
            ShowResolver,
            SongResolver,
            SongInstanceResolver,
            SetResolver,
            UserResolver,
            VenueResolver,
        ],
        dateScalarMode: 'isoDate',
        validate: true
    });

    return new ApolloServer({
        cors: { origin: '*' },
        schema
    });
}

