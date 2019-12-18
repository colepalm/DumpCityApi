const songInstance = (sequelize, DataTypes) => {
  const SongInstance = sequelize.define('songInstance', {
    song: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    setNumber: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
    },
    showId: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
      references: {
        model: 'shows',
        key: 'id'
      },
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    jamChart: {
      type: DataTypes.BOOLEAN,
      unique: false,
      defaultValue: false
    },
  });

  SongInstance.associate = models => {
    SongInstance.belongsTo(models.Show, { onDelete: 'CASCADE '})
  };

  return SongInstance;
};

export default songInstance