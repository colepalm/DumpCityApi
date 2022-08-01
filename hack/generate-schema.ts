import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { printSchema } from 'graphql';
import { writeFile } from 'fs';
import 'reflect-metadata';


import { SetResolver, ShowResolver, SongInstanceResolver, SongResolver, VenueResolver } from '../src/resolvers';
import { ThreadResolver } from '../src/resolvers/forum';

async function createSchema() {
    return await buildSchema({
        container: Container,
        resolvers: [
            SetResolver,
            ShowResolver,
            SongResolver,
            SongInstanceResolver,
            ThreadResolver,
            VenueResolver,
        ],
        dateScalarMode: 'isoDate',
        validate: true
    });
}

(async () => {
    const schema = await createSchema();
    const sdl = printSchema(schema);
    await writeFile(__dirname + '/../../DumpCity/schema.graphql', sdl, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("Schema created successfully");
        }
    });
})();
