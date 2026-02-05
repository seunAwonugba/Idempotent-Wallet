import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { TransferService } from "../service/transfer";
import { WalletRepository } from "../repository/wallet";
import { TransactionRepository } from "../repository/transaction";
import { TransactionService } from "../service/transaction";
import { TransactionLogRepository } from "../repository/transaction-log";

const walletRepository = new WalletRepository();
const transactionRepository = new TransactionRepository();
const transactionLogRepository = new TransactionLogRepository();
const transactionService = new TransactionService(
    transactionRepository,
    transactionLogRepository,
    walletRepository,
);
const transferService = new TransferService(
    walletRepository,
    transactionService,
);

export const transfer = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {        
        const transfer = await transferService.transfer(req.body);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: transfer,
        });
    } catch (error) {
        next(error);
    }
};
