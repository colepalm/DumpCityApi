import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        venues: [Venue!]
    }

    extend type Mutation {
        createVenue(
            name: String!
            city: String!
            state: String!
            country: String!
        ): Venue!
    }

    type Venue {
        id: ID!
        name: String!
        city: String!
        state: String!
        country: String!
        timesPlayed: Int
        firstTime: String
        lastTime: String
    }
`