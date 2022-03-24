import mongoose from "mongoose";

export interface refreshToken extends Document {
    tokenJti: string;
}

export default new mongoose.Schema<refreshToken>({
    tokenJti: { type: String, required: true },
})