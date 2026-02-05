"use strict";

import { nanoid } from "nanoid";
import { DataTypes, QueryInterface } from "sequelize";
import { ACCOUNT_ID_REQUIRED, ACCOUNT_ID_NOT_NULL } from "../constant/constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("wallets", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING,
                defaultValue: () => nanoid(),
            },
            accountId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: ACCOUNT_ID_REQUIRED,
                    },
                    notNull: {
                        msg: ACCOUNT_ID_NOT_NULL,
                    },
                },
            },
            balance: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable("wallets");
    },
};
