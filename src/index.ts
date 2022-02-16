import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import {
    SetResolver,
    ShowResolver,
    SongInstanceResolver,
    SongResolver,
    VenueResolver
} from './resolvers';

export async function createApolloServer(): Promise<ApolloServer> {
    // const connectionOptions: PostgresConnectionOptions = {
    //     name: `default`,
    //     type: `postgres`,
    //     ssl: true,
    //     url: 'postgres://cigyexiijubsze:5d48077063d92d2c7d90a2babfda86e1c34260a95783827b8242d8f836e9c3c8@ec2-44-194-54-186.compute-1.amazonaws.com:5432/dbo89ttmshhh7q',
    //     extra: {
    //         ssl: {
    //             rejectUnauthorized: false,
    //         },
    //     }
    // };

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

