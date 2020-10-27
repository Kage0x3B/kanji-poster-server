import express from "express";
import posterGenerator from "../poster/posterGenerator.mjs";

const router = express.Router();

router.get("/", (req, res) => {
    res.header("Content-Type", "application/pdf");
    res.header("Content-Disposition", "inline");
    posterGenerator.generatePoster({}, res);
});

export default router;
