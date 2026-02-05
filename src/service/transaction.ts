import {
    COMPLETED,
    CREDIT,
    DEBIT,
    WALLET_NOT_FOUND,
} from "../constant/constant";
import { BadRequest } from "../error";
import sequelize from "../models";
import { TransactionRepository } from "../repository/transaction";
import { TransactionLogRepository } from "../repository/transaction-log";
import { WalletRepository } from "../repository/wallet";

export class TransactionService {
    constructor(
        private transactionRepository: TransactionRepository,
        private transactionLogRepository: TransactionLogRepository,
        private walletRepository: WalletRepository,
    ) {}

    async createTransaction(payload: any) {
        try {
            const {
                externalTransactionReference,
                fromAccountId,
                toAccountId,
                fromWalletId,
                toWalletId,
                transactionFee,
                amount,
                fromWalletBalance,
                toWalletBalance,
                idempotencyKey,
            } = payload;
            const result = await sequelize.transaction(async (t) => {
                //Include a TransactionLog entry with a PENDING state created before the main transaction begins.
                //create from transaction log
                const transactionLogPayload = {
                    externalTransactionReference,
                    fromWalletId,
                    toWalletId,
                    idempotencyKey,
                };

                const createLogs =
                    await this.transactionLogRepository.createLog(
                        transactionLogPayload,
                        t,
                    );
                const logId = createLogs.id;

                const fromWalletPayload = {
                    amount,
                    walletId: fromWalletId,
                };
                const toWalletPayload = {
                    amount,
                    walletId: toWalletId,
                };
                //reduce wallet balance
                const decreaseFromWalletBalance =
                    await this.walletRepository.decreaseWalletBalance(
                        fromWalletPayload,
                        t,
                    );

                const decreasedWallet: any =
                    decreaseFromWalletBalance.flat(Infinity)[0];

                const decreasedWalletBalance = decreasedWallet.balance;

                //increase wallet balance
                const increaseToWalletBalance =
                    await this.walletRepository.increaseWalletBalance(
                        toWalletPayload,
                        t,
                    );
                const increasedWallet: any =
                    increaseToWalletBalance.flat(Infinity)[0];

                const increasedWalletBalance = increasedWallet.balance;

                //from transaction payload
                const fromTransactionPayload = {
                    accountId: fromAccountId,
                    fromWalletId,
                    toWalletId,
                    externalTransactionReference,
                    status: COMPLETED,
                    type: DEBIT,
                    amount,
                    transactionFee,
                    balanceBefore: fromWalletBalance,
                    balanceAfter: decreasedWalletBalance,
                };

                const createFromTransaction =
                    await this.transactionRepository.createTransaction(
                        fromTransactionPayload,
                        t,
                    );

                const fromTransactionId = createFromTransaction.id;

                //to transaction payload
                const toTransactionPayload = {
                    accountId: toAccountId,
                    fromWalletId,
                    toWalletId,
                    externalTransactionReference,
                    status: COMPLETED,
                    type: CREDIT,
                    amount,
                    transactionFee,
                    balanceBefore: toWalletBalance,
                    balanceAfter: increasedWalletBalance,
                };

                const createToTransaction =
                    await this.transactionRepository.createTransaction(
                        toTransactionPayload,
                        t,
                    );

                const toTransactionId = createToTransaction.id;

                //update transaction log
                await this.transactionLogRepository.updateTransactionLog(
                    logId,
                    {
                        fromTransactionId,
                        toTransactionId,
                        status: COMPLETED,
                    },
                    t,
                );

                return decreasedWallet;
            });

            return result;
        } catch (error: any) {
            throw new BadRequest(error.message);
        }
    }
}
