import express from "express";
import { transfer } from "../controller/transfer";

const transferRouter = express.Router();

transferRouter.post("/", transfer);

export default transferRouter;
