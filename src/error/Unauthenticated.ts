import { StatusCodes } from "http-status-codes";
import { CustomErrorHandler } from "./index.js";

class Unauthenticated extends CustomErrorHandler {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default Unauthenticated
