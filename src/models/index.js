import Sequelize from "sequelize";
import userModel from "./user.model";
import locationModel from "./location.model";
import { NODE_ENV } from "../config";

const config = {
  development: {
    dialect: "sqlite",
    // storage: "./db.sqlite3",
    storage: "db.sqlite3",
    logging: false,
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  },
};

const sequelize = new Sequelize(config[NODE_ENV]);

const models = {
  User: userModel(sequelize, Sequelize.DataTypes),
  Location: locationModel(sequelize, Sequelize.DataTypes),
};

export { sequelize };
export default models;
