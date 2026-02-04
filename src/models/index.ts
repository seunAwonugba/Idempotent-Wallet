"use strict";
import "dotenv/config";
import { Sequelize } from "sequelize";
import config from "../config/config";
import { DatabaseConfig } from "../interface/config";

const dbConfig = config as DatabaseConfig;

const sequelize = new Sequelize(
    dbConfig.database as string,
    dbConfig.username as string,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: "postgres",
        logging: false,
        ...(dbConfig.ssl && {
            ssl: true,
            dialectOptions: dbConfig.dialectOptions,
        }),
        pool: {
            max: 10,
            acquire: 60000,
        },
    }
);

export default sequelize;
