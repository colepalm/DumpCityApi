import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import showSchema from './show'
import venueSchema from './venue'
import songSchema from './song'
import songInstanceSchema from "./songInstance";

const linkSchema = gql`
    scalar Date
    
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

export default [
    linkSchema,
    userSchema,
    messageSchema,
    showSchema,
    venueSchema,
    songSchema,
    songInstanceSchema
];