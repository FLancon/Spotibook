import cors from "cors";
import express from "express";
import loginRouter from "./src/routes/loginRouter";
import bookRouter from "./src/routes/bookRouter";
import * as dotenv from "dotenv";
import "./src/database/connect";
import selfServiceRouter from "./src/routes/selfServiceRouter";
import borrowRouter from "./src/routes/borrowRouter";
import renderRouter from "./src/routes/renderRouter";
import { createData } from './src/database/connect';

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(cors());
app.use(express.json());
//createData()
// dotenv.config({path: `./.env.${process.env.NODE_ENV}`})
dotenv.config();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Books API",
            description: "API for books management app",
            contact: {
                name: "Dieu",
            },
        },
    },
    apis: [`./src/routes/*.ts`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/book", bookRouter);
app.use("/api/login", loginRouter);
app.use("/api/selfservice", selfServiceRouter);
app.use("/api/borrow", borrowRouter);
app.use("/api/render", renderRouter);

export default app;
