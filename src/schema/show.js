import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        shows: [Show!]
    }

    extend type Mutation {
        createShow(
            date: String!
            venue: String!
        ): Show!
    }
  
    type Show {
        id: ID!
        date: String!
        venue: String!
        rating: Int
    }
`