import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        createSong(name: String!): Song!
    }
    
    type Song {
        id: ID!
        name: String!
        firstPlayed: String
        lastPlayed: String
        currentGap: Int
        timesPlayed: Int
    }
`