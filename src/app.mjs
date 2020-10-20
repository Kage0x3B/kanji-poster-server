import express from "express";
import bodyParser from "body-parser";
import http from "http";
import helmet from "helmet";

import config from "./config.mjs";
import generate from "./controller/generate.mjs";

const app = express();

app.use(helmet());
app.use((req, res, next) => {
    if (config.dev) {
        res.setHeader("Access-Control-Allow-Origin", "*");
    } else {
        res.setHeader("Access-Control-Allow-Origin", config.publicUrl);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, authorization, X-PINGOTHER, Cache-Control"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);

    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/generate", generate);

app.all("*", async (err, req, res, next) => {
    const error = new Error("Request handler not found");
    error.statusCode = 404;

    throw error;
});

const ignoredErrors = [401];

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;

    if (config.dev && ignoredErrors.includes(err.statusCode)) {
        console.warn(err);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        err
    });
});

http.createServer(app).listen(config.port, "0.0.0.0", () => {
    console.log(`Listening on ${config.port}`);
});
