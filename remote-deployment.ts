import 'reflect-metadata';

import { Container } from 'typedi';
import * as TypeORM from "typeorm";

import { createApolloServer } from './src';

TypeORM.useContainer(Container);

async function main() {
    const server = await createApolloServer()

    const handler = server({
        cors: {
            origin: true,
            credentials: true,
        },
    });
}

main();
