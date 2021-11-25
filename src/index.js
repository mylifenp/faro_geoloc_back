import "dotenv/config";
import cors from "cors";
import express from "express";
import api from "./api";

import { PORT } from "./config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", api);

app.listen({ port: PORT }, () => console.log(`backend ready on port: ${PORT}`));
