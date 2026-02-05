"use strict";

import { nanoid } from "nanoid";
import { DataTypes, QueryInterface } from "sequelize";
import {
    ACCOUNT_ID_NOT_NULL,
    ACCOUNT_ID_REQUIRED,
    PENDING,
} from "../constant/constant";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("transactions", {
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
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: PENDING,
            },
            amount: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                defaultValue: 0,
            },
            transactionFee: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                defaultValue: 0,
            },
            balanceBefore: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                defaultValue: 0,
            },
            balanceAfter: {
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
        await queryInterface.dropTable("transactions");
    },
};
