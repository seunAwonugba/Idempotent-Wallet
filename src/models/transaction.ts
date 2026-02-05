"use strict";

import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
} from "sequelize";
import sequelize from ".";
import {
    ACCOUNT_ID_REQUIRED,
    ACCOUNT_ID_NOT_NULL,
    PENDING,
    EXTERNAL_REF_REQUIRED,
    EXTERNAL_REF_NOT_NULL,
    TRANSFER,
    TRANSACTION_TYPE_REQUIRED,
    TRANSACTION_TYPE_NOT_NULL,
    WALLET_ID_REQUIRED,
    WALLET_ID_NOT_NULL,
} from "../constant/constant";
import { nanoid } from "nanoid";

class Transactions extends Model<
    InferAttributes<Transactions>,
    InferCreationAttributes<Transactions>
> {
    declare id: CreationOptional<string>;

    declare accountId: string;
    declare fromWalletId: string;
    declare toWalletId: string;
    declare externalTransactionReference: string;
    declare status: string;
    declare type: string;
    declare amount: number;
    declare transactionFee: number;
    declare balanceBefore: number;
    declare balanceAfter: number;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    static associations: {};
}
Transactions.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "transactions",
        modelName: "transaction",
    },
);
export default Transactions;
