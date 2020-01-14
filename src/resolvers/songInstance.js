export default  {
    Mutation: {
        createSongInstance: async (
            parent,
            { songId, setNumber, position, showId },
            { models }) => {
            return models.SongInstance.create({
                songId,
                setNumber,
                position,
                showId,
                jamChart: false
            })
        }
    }
}