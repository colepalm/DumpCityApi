const song = (sequelize, DataTypes) => {
  return sequelize.define('song', {
      name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              notEmpty: true,
          },
      },
      firstPlayed: {
          type: DataTypes.INTEGER,
          unique: false,
          allowNull: true,
      },
      lastPlayed: {
          type: DataTypes.INTEGER,
          unique: false,
          allowNull: true,
      },
      currentGap: {
          type: DataTypes.INTEGER,
          unique: false,
          allowNull: true,
      },
      timesPlayed: {
          type: DataTypes.INTEGER,
          unique: false,
          allowNull: true,
      }
  });
};

export default song;