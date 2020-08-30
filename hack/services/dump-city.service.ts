import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import axios from 'axios';

const { buildAxiosFetch } = require("@lifeomic/axios-fetch");

export class DumpCityService {
    public client: ApolloClient<NormalizedCacheObject>

    constructor() {
        const dumpCityBaseUrl = 'http://localhost:4000';

        const link = createHttpLink({
            uri: dumpCityBaseUrl,
            fetch: buildAxiosFetch(axios)
        });

        this.client = new ApolloClient({
            link: link,
            cache: new InMemoryCache()
        })
    }
}