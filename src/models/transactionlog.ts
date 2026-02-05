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
import { EXTERNAL_REF_NOT_NULL, EXTERNAL_REF_REQUIRED, PENDING } from "../constant/constant";

class TransactionLog extends Model<
    InferAttributes<TransactionLog>,
    InferCreationAttributes<TransactionLog>
> {
    declare id: CreationOptional<string>;

    declare transactionId: string | null;
    declare externalTransactionReference: string;
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
