"use strict";

import { nanoid } from "nanoid";
import { DataTypes, QueryInterface } from "sequelize";
import {
    EXTERNAL_REF_NOT_NULL,
    EXTERNAL_REF_REQUIRED,
    PENDING,
} from "../constant/constant";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("transactionLogs", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING,
                defaultValue: () => nanoid(),
            },
            transactionId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            externalTransactionReference: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: EXTERNAL_REF_REQUIRED,
                    },
                    notNull: {
                        msg: EXTERNAL_REF_NOT_NULL,
                    },
                },
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: PENDING,
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
        await queryInterface.dropTable("transactionLogs");
    },
};
