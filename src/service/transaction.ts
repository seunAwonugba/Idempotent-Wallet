import sequelize from "../models";
import { TransactionRepository } from "../repository/transaction";
import { TransactionLogRepository } from "../repository/transaction-log";

export class TransactionService {
    constructor(
        private transactionRepository: TransactionRepository,
        private transactionLogRepository: TransactionLogRepository,
    ) {}

    async createTransaction(payload: any) {
        try {
            const {
                externalTransactionReference,
                accountId,
                amount,
                transactionFee,
            } = payload;
            const result = await sequelize.transaction(async (t) => {
                //Include a TransactionLog entry with a PENDING state created before the main transaction begins.
                //create transaction log
                const transactionLogPayload = {
                    externalTransactionReference,
                };

                const createLogs =
                    await this.transactionLogRepository.createLog(
                        transactionLogPayload,
                        t,
                    );
                const transactionPayload = {
                    externalTransactionReference,
                };
            });
        } catch (error) {}
    }
}
