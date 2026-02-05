import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { INSUFFICIENT_BALANCE, WALLET_NOT_FOUND } from "../constant/constant";
import { BadRequest, Forbidden } from "../error";
import sequelize from "../models";
import { WalletRepository } from "../repository/wallet";
import { nanoid } from "nanoid";
import { TransactionService } from "./transaction";

export class TransferService {
    constructor(
        private walletRepository: WalletRepository,
        private transactionService: TransactionService,
    ) {}

    async transfer(payload: any) {
        try {
            // You must handle race conditions to prevent double-spending.
            const result = await sequelize.transaction(async (t) => {
                const { fromWalletId, toWalletId, amount } = payload;

                //prevent same wallet transfer
                if (fromWalletId == toWalletId) {
                    throw new Forbidden(ReasonPhrases.FORBIDDEN);
                }

                const getFromWallet = await this.walletRepository.getWallet(
                    fromWalletId,
                    t,
                );

                if (!getFromWallet) {
                    throw new BadRequest(
                        `From ${WALLET_NOT_FOUND.toLowerCase()}`,
                    );
                }

                const getToWallet = await this.walletRepository.getWallet(
                    toWalletId,
                    t,
                );

                if (!getToWallet) {
                    throw new BadRequest(
                        `To ${WALLET_NOT_FOUND.toLowerCase()}`,
                    );
                }

                const fromWalletBalance = getFromWallet.balance;
                const toWalletBalance = getToWallet.balance;

                //insufficient balance
                if (Number(amount) > fromWalletBalance) {
                    throw new BadRequest(INSUFFICIENT_BALANCE);
                }

                const transactionPayload = {
                    externalTransactionReference: nanoid(),
                    fromAccountId: getFromWallet.accountId,
                    toAccountId: getToWallet.accountId,
                    fromWalletId: getFromWallet.id,
                    toWalletId: getToWallet.id,
                    transactionFee: (1 / 100) * Number(amount),
                    fromWalletBalance,
                    toWalletBalance,
                    amount: Number(amount),
                };

                const transfer =
                    await this.transactionService.createTransaction(
                        transactionPayload,
                    );

                return transfer;
            });

            return result;
        } catch (error: any) {
            throw new BadRequest(error.message);
        }
    }
}
