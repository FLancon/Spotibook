import cors from "cors";
import express from "express";
import loginRouter from "./src/routes/loginRouter";
import bookRouter from "./src/routes/bookRouter";
import * as dotenv from "dotenv";
import "./src/database/connect";
import selfServiceRouter from "./src/routes/selfServiceRouter";
import borrowRouter from "./src/routes/borrowRouter";
import renderRouter from "./src/routes/renderRouter";
import cron from "node-cron";
import { modelBook } from "./src/models/model";
import axios from "axios";
import { createData } from './src/database/connect';

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(cors());
app.use(express.json());
createData()
// dotenv.config({path: `./env.${process.env.NODE_ENV}`})
dotenv.config();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Books API",
            description: "API for books management app",
            contact: {
                name: "Jules verges",
            },
            servers: [
                {
                    url: `http://alexis-cuvillier.online:5009`,
                    description: "localhost",
                },
            ],
        },
    },
    apis: [`./src/routes/*.ts`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

///
    const numberWeek = 5;
    cron.schedule(
        "* 20 * * *",
       async () => {
            const getBook = (await modelBook.find({})).filter((date) => {
                if (!date.borrow_date) return false;
                return (
                    new Date(
                        date.borrow_date.getTime() *
                            1000 *
                            60 *
                            60 *
                            24 *
                            7 *
                            numberWeek
                    ) <= new Date()
                );
            });
            getBook.forEach((element) => {
                axios.post("http://141.94.247.187:3000/api/v1/send", {
                    code: element.user_id,
                    subject: "Livre non rendu",
                    message: `Tu va payer le livre ${element.title} si tu le rends pas`,
                });
            });    
        },
        {
            scheduled: true,
            timezone: "Europe/Paris",
        }
    );
////

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/book", bookRouter);
app.use("/api/login", loginRouter);
app.use("/api/selfservice", selfServiceRouter);
app.use("/api/borrow", borrowRouter);
app.use("/api/render", renderRouter);

export default app;
