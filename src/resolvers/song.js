export default {
    Mutation: {
        createSong: (parent, { name }, { models }) => {
            return models.Song.create({name, timesPlayed: 1})
        }
    }
}