import { Transaction } from "sequelize";
import TransactionLog from "../models/transactionlog";

export class TransactionLogRepository {
    async createLog(transaction: any, t: Transaction) {
        const createTransaction = await TransactionLog.create(transaction, {
            transaction: t,
        });
        return createTransaction;
    }

    async getLog(id: string, t?: Transaction) {
        const transaction = await TransactionLog.findByPk(id, {
            transaction: t,
        });
        return transaction;
    }

    async getLogByTransactionId(transactionId: string, t?: Transaction) {
        const log = await TransactionLog.findOne({
            where: {
                fromTransactionId: transactionId,
            },
            transaction: t,
        });
        return log;
    }

    async updateTransactionLog(id: string, data: any, t?: Transaction) {
        const [affectedRowsCount, [updatedRecord]] =
            await TransactionLog.update(
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

    async updateTransactionByTransactionId(
        transactionId: string,
        data: any,
        t?: Transaction,
    ) {
        const [affectedRowsCount, [updatedRecord]] =
            await TransactionLog.update(
                {
                    ...data,
                },
                {
                    where: {
                        fromTransactionId: transactionId,
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
