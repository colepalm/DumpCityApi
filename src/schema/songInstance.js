import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        createSongInstance(
            songId: String!
            setNumber: Int!
            position: Int!
            show: Int!,
            description: String
            jamChart: Boolean
        ): SongInstance!
    }
    
    type SongInstance {
        id: ID!
        song: Song!
        setNumber: Int!
        position: Int!
        show: Show!
        description: String
        jamChart: Boolean
    }
`