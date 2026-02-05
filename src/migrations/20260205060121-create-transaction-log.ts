"use strict";

import { nanoid } from "nanoid";
import { DataTypes, QueryInterface } from "sequelize";
import {
    EXTERNAL_REF_NOT_NULL,
    EXTERNAL_REF_REQUIRED,
    PENDING,
    WALLET_ID_NOT_NULL,
    WALLET_ID_REQUIRED,
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
            fromTransactionId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            toTransactionId: {
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
            fromWalletId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `From ${WALLET_ID_REQUIRED.toLowerCase()}`,
                    },
                    notNull: {
                        msg: `From ${WALLET_ID_NOT_NULL.toLowerCase()}`,
                    },
                },
            },
            toWalletId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `To ${WALLET_ID_REQUIRED.toLowerCase()}`,
                    },
                    notNull: {
                        msg: `To ${WALLET_ID_NOT_NULL.toLowerCase()}`,
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
