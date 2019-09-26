const venue = (sequelize, DataTypes) => {
  return sequelize.define('venue', {
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    timesPlayed: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    firstTime: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    lastTime: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  });
};

export default venue;