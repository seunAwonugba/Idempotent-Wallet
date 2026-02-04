// sequelize.config.js
require("dotenv").config();

const withSSL = {
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        native: true,
    },
};

const baseConfig = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.IDEMPOTENT_WALLET_DEV_DB,
        host: process.env.IDEMPOTENT_WALLET_DB_HOST_TEST,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        username: process.env.DB_USERNAME_TEST,
        password: process.env.DB_PASSWORD_TEST,
        database: process.env.IDEMPOTENT_WALLET_TEST_DB,
        host: process.env.IDEMPOTENT_WALLET_DB_HOST_DEV,
        dialect: process.env.DB_DIALECT,
    },
    production: {
        username: process.env.DB_USERNAME_PROD,
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.IDEMPOTENT_WALLET_PROD_DB,
        host: process.env.IDEMPOTENT_WALLET_DB_HOST_TEST,
        dialect: process.env.DB_DIALECT,
    },
};

module.exports = {
    development: !process.env.SERVER
        ? baseConfig.development
        : { ...baseConfig.development, ...withSSL },
    test: !process.env.SERVER
        ? baseConfig.test
        : { ...baseConfig.test, ...withSSL },
    production: !process.env.SERVER
        ? baseConfig.production
        : { ...baseConfig.production, ...withSSL },
};
