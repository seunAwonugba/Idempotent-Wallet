"use strict";

import { nanoid } from "nanoid";
import { DataTypes, QueryInterface } from "sequelize";
import {
    ACCOUNT_ID_NOT_NULL,
    ACCOUNT_ID_REQUIRED,
    EXTERNAL_REF_NOT_NULL,
    EXTERNAL_REF_REQUIRED,
    PENDING,
    TRANSACTION_TYPE_NOT_NULL,
    TRANSACTION_TYPE_REQUIRED,
    TRANSFER,
    WALLET_ID_NOT_NULL,
    WALLET_ID_REQUIRED,
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
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: TRANSACTION_TYPE_REQUIRED,
                    },
                    notNull: {
                        msg: TRANSACTION_TYPE_NOT_NULL,
                    },
                },
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
