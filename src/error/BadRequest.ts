import { StatusCodes } from "http-status-codes";
import CustomErrorHandler from "./CustomErrorHandler";

class BadRequest extends CustomErrorHandler {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequest;
