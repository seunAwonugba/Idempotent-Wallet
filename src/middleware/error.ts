import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import CustomErrorHandler from "../error/CustomErrorHandler.js";
import {
    JSON_WEB_TOKEN_ERROR,
    SEQUELIZE_DATABASE_ERROR,
    SEQUELIZE_VALIDATION_ERROR,
    UNKNOWN_ERROR,
} from "../constant/constant.js";

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // console.log("errorMiddleware", err);

    if (err instanceof CustomErrorHandler) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    if (err.isJoi == true) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: err.details[0].message,
        });
    }

    if (err.name === SEQUELIZE_VALIDATION_ERROR) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            success: false,
            message: err.errors[0].message,
        });
    }

    if (err.name == SEQUELIZE_DATABASE_ERROR) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: err,
        });
    }

    if (err.name == JSON_WEB_TOKEN_ERROR) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: err?.message,
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message.split(":")[2] || UNKNOWN_ERROR,
    });
};
