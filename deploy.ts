import 'reflect-metadata';

import { Container } from 'typedi';
import * as TypeORM from "typeorm";

import { createApolloServer } from './src';

TypeORM.useContainer(Container);

async function main() {
    const server = await createApolloServer()

    const port = { port: process.env.PORT || 4000 };
    await server.listen(port);
    console.log(`Server has started at port ${port.port}!`);
}

main();
