import Sequelize from 'sequelize';
import * as dotenv from "dotenv";
import * as pg from "pg";

let sequelize;
const env = dotenv.config().parsed ? dotenv.config().parsed : process.env;

pg.defaults.ssl = true;
if (env.DATABASE_URL) {
  sequelize = new Sequelize(env.DATABASE_URL, {
    dialect: 'postgres',
  });
} else {
  new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
    },
  );
}

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
  Show: sequelize.import('./show'),
  Venue: sequelize.import('./venue'),
  SongInstance: sequelize.import('./songInstance'),
  Song: sequelize.import('./song')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;