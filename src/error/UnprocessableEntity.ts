import { StatusCodes } from "http-status-codes";
import { CustomErrorHandler } from "./index.js";

class UnprocessableEntity extends CustomErrorHandler {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    }
}

export default UnprocessableEntity;
