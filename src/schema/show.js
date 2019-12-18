import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        shows: [Show!]
    }

    extend type Mutation {
        createShow(
            date: String!
            venueName: String!
            city: String,
            state: String,
            country: String,
        ): Show!
    }
  
    type Show {
        id: ID!
        date: String!
        venueId: Int!
        rating: Int
        setlist: [SongInstance]!
    }
`