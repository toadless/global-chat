import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import setUser from "./auth/setUser";
import { router } from "./router";
import "./mongodb";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*", credentials: false }));
app.use(setUser);
app.use(router);

const server = http.createServer(app)
server.listen({ port: PORT }, () => {
    console.log(`Server listening on port ${PORT}`)
})