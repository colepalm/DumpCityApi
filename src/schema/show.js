import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        shows: [Show!]
    }

    extend type Mutation {
        addShow(
            date: String!
            venue: String!
        ): Boolean!
    }
  
    type Show {
        id: ID!
        date: String!
        venue: String!
        rating: Int
    }
`