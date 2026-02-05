import express from "express";
import { createWallet, getWallet, getWallets } from "../controller/wallet";

const wallet = express.Router();

wallet.post("/", createWallet);
wallet.post("/fetch", getWallets);
wallet.patch("/:id", getWallet);

export default wallet;
