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
import { ACCOUNT_ID_REQUIRED, ACCOUNT_ID_NOT_NULL } from "../constant/constant";

class Wallet extends Model<
    InferAttributes<Wallet>,
    InferCreationAttributes<Wallet>
> {
    declare id: CreationOptional<string>;
    declare accountId: string;
    declare balance: number;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    static associations: {};
}
Wallet.init(
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
        balance: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "wallets",
        modelName: "wallet",
    },
);
export default Wallet;
