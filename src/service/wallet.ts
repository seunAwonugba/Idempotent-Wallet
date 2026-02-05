import { WALLET_NOT_FOUND } from "../constant/constant";
import { BadRequest } from "../error";
import { WalletRepository } from "../repository/wallet";

export class WalletService {
    constructor(private walletRepository: WalletRepository) {}
    async createWallet(payload: any) {
        const createWallet = await this.walletRepository.createWallet(payload);
        return createWallet;
    }
    async getWalletsByAccountId(accountId: string) {
        const getWallets =
            await this.walletRepository.getWalletsByAccountId(accountId);
        return getWallets;
    }
    async getWallet(id: string) {
        const getWallet = await this.walletRepository.getWallet(id);
        if (!getWallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }
        return getWallet;
    }
}
