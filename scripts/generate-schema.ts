import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { printSchema } from 'graphql';
import { writeFile } from 'fs';
import 'reflect-metadata';

import { SetResolver, ShowResolver, SongInstanceResolver, SongResolver, VenueResolver } from '../src/resolvers/show';
import { PostResolver } from '../src/resolvers/forum';
import { UserResolver } from '../src/resolvers/user/UserResolver';

async function createSchema() {
    return await buildSchema({
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
}

(async () => {
    const schema = await createSchema();
    const sdl = printSchema(schema);
    await writeFile(__dirname + '/../../DumpCity/schema/schema.graphql', sdl, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("Schema created successfully");
        }
    });
})();
