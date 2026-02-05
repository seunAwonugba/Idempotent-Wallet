import Joi from "joi";
import {
    AMOUNT_NOT_EMPTY,
    AMOUNT_REQUIRED,
    KEY_NOT_EMPTY,
    KEY_REQUIRED,
    WALLET_ID_NOT_EMPTY,
    WALLET_ID_REQUIRED,
} from "../constant/constant";

export const transferSchema = Joi.object({
    fromWalletId: Joi.string().trim().required().messages({
        "any.required": `From ${WALLET_ID_REQUIRED.toLowerCase()}`,
        "string.empty": `From ${WALLET_ID_NOT_EMPTY.toLowerCase()}`,
    }),
    toWalletId: Joi.string().trim().required().messages({
        "any.required": `To ${WALLET_ID_REQUIRED.toLowerCase()}`,
        "string.empty": `To ${WALLET_ID_NOT_EMPTY.toLowerCase()}`,
    }),
    amount: Joi.string().trim().required().messages({
        "any.required": AMOUNT_REQUIRED,
        "string.empty": AMOUNT_NOT_EMPTY,
    }),
    idempotencyKey: Joi.string().trim().required().messages({
        "any.required": KEY_REQUIRED,
        "string.empty": KEY_NOT_EMPTY,
    }),
});
