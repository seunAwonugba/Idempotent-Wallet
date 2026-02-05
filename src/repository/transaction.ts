import { Transaction } from "sequelize";
import Transactions from "../models/transaction";

export class TransactionRepository {
    async createTransaction(transaction: any, t: Transaction) {
        const createTransaction = await Transactions.create(transaction, {
            transaction: t,
        });
        return createTransaction;
    }

    async getTransaction(id: string, t?: Transaction) {
        const transaction = await Transactions.findByPk(id, {
            transaction: t,
        });
        return transaction;
    }

    async getTransactionByExternalReference(
        reference: string,
        t?: Transaction,
    ) {
        const transaction = await Transactions.findOne({
            where: {
                externalTransactionReference: reference,
            },
            transaction: t,
        });
        return transaction;
    }

    async getTransactionByAccountId(accountId: string, t?: Transaction) {
        const transaction = await Transactions.findAll({
            where: {
                accountId,
            },
            transaction: t,
        });
        return transaction;
    }

    async updateTransaction(id: string, data: any, t?: Transaction) {
        const [affectedRowsCount, [updatedRecord]] = await Transactions.update(
            {
                ...data,
            },
            {
                where: {
                    id,
                },
                returning: true,
                validate: true,
                transaction: t,
            },
        );

        if (affectedRowsCount > 0 && updatedRecord) {
            return updatedRecord;
        }
    }

    async updateTransactionByExternalTransactionRef(
        externalTransactionReference: string,
        data: any,
        t?: Transaction,
    ) {
        const [affectedRowsCount, [updatedRecord]] = await Transactions.update(
            {
                ...data,
            },
            {
                where: {
                    externalTransactionReference,
                },
                returning: true,
                validate: true,
                transaction: t,
            },
        );

        if (affectedRowsCount > 0 && updatedRecord) {
            return updatedRecord;
        }
    }
}
