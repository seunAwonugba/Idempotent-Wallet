import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { WalletRepository } from "../repository/wallet";
import { WalletService } from "../service/wallet";

const walletRepository = new WalletRepository();
const walletService = new WalletService(walletRepository);

export const createWallet = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const createWallet = await walletService.createWallet(req.body);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: createWallet,
        });
    } catch (error) {
        next(error);
    }
};

export const getWallets = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { accountId } = req.body;
        const getWallets = await walletService.getWalletsByAccountId(accountId);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: getWallets,
        });
    } catch (error) {
        next(error);
    }
};

export const getWallet = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const getWallet = await walletService.getWallet(id);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: getWallet,
        });
    } catch (error) {
        next(error);
    }
};
