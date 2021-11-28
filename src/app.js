import "dotenv/config";
import cors from "cors";
import express from "express";
import logger from "morgan";
import serveStatic from "serve-static";
import api from "./api";

import { PORT } from "./config";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", serveStatic("static"));

app.use("/api", api);

app.listen({ port: PORT }, () => console.log(`backend ready on port: ${PORT}`));
