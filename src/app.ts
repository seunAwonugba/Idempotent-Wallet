import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { errorMiddleware } from "./middleware/error";
import sequelize from "./models";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.disable("x-powered-by");

app.get("/health", (req, res) => {
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
    });
});

app.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: `Event services ${ReasonPhrases.NOT_FOUND}`,
    });
});
app.use(errorMiddleware);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            "⚡️[database]: Database connection has been established successfully.",
        );
        app.listen(Number(process.env.PORT), String(process.env.HOST), () => {
            console.log(
                `⚡️[server]: Server is running at http://${process.env.HOST}:${process.env.PORT}`,
            );
        });
    } catch (error) {
        console.log("😥 [server error]:", error);
        process.exit(1);
    }
};

startServer();

const gracefulShutdown = () => {
    sequelize
        .close()
        .catch(() => {})
        .then(() => process.exit());
};

process.on("SIGINT", gracefulShutdown); //when you press Ctrl+C in the terminal
process.on("SIGTERM", gracefulShutdown); //when the process is terminated by the system
process.on("SIGUSR2", gracefulShutdown); //often used by development tools like Nodemon for hot reloading
