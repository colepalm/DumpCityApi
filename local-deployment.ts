import 'reflect-metadata';

import { Container } from 'typedi';
import * as TypeORM from "typeorm";

import { createApolloServer } from './src';

TypeORM.useContainer(Container);

async function main() {
    const server = await createApolloServer()

    await server.listen(4000);
    console.log('Server has started at port 4000!');
}

main();
