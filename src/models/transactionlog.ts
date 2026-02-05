"use strict";

import { nanoid } from "nanoid";
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
} from "sequelize";
import sequelize from ".";
import {
    EXTERNAL_REF_NOT_NULL,
    EXTERNAL_REF_REQUIRED,
    PENDING,
    WALLET_ID_NOT_NULL,
    WALLET_ID_REQUIRED,
} from "../constant/constant";

class TransactionLog extends Model<
    InferAttributes<TransactionLog>,
    InferCreationAttributes<TransactionLog>
> {
    declare id: CreationOptional<string>;

    declare externalTransactionReference: string;
    declare fromWalletId: string;
    declare toWalletId: string;
    declare fromTransactionId: string | null;
    declare toTransactionId: string | null;
    declare status: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    static associations: {};
}
TransactionLog.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "transactionLogs",
        modelName: "transactionLog",
    },
);
export default TransactionLog;
