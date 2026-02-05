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
} from "../constant/constant";
import { nanoid } from "nanoid";

class Transactions extends Model<
    InferAttributes<Transactions>,
    InferCreationAttributes<Transactions>
> {
    declare id: CreationOptional<string>;

    declare accountId: string;
    declare externalTransactionReference: string;
    declare status: string;
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
