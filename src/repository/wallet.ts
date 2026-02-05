import { Transaction } from "sequelize";
import Wallet from "../models/wallet";

export class WalletRepository {
    async getWallet(id: string, t?: Transaction) {
        const transaction = await Wallet.findByPk(id, {
            transaction: t,
        });
        return transaction;
    }
    async increaseWalletBalance(payload: any, t: Transaction) {
        const { amount, walletId } = payload;
        const increaseBalance = await Wallet.increment("balance", {
            by: amount,
            transaction: t,
            where: {
                id: walletId,
            },
        });

        return increaseBalance;
    }
    async decreaseWalletBalance(payload: any, t: Transaction) {
        const { amount, walletId } = payload;
        const increaseBalance = await Wallet.decrement("balance", {
            by: amount,
            transaction: t,
            where: {
                id: walletId,
            },
        });

        return increaseBalance;
    }

    async createWallet(payload: any) {
        const createWallet = await Wallet.create(payload);
        return createWallet;
    }

    async getWalletsByAccountId(accountId: any) {
        const createWallet = await Wallet.findAll({
            where: {
                accountId,
            },
        });
        return createWallet;
    }
}
