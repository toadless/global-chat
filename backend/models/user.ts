import mongoose from "mongoose";
import refreshToken, { refreshToken as refreshTkn } from "./refreshToken";

export interface User {
    username: string;
    email: string;
    password: string;

    creationDate: Date;
    lastUpdated: Date;

    refreshTokens: Array<refreshTkn>;
}

export default mongoose.model("user", new mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    creationDate: { type: Date, required: true },
    lastUpdated: { type: Date, required: true },

    refreshTokens: { type: [refreshToken], unique: true, required: true, default: [] },
}));