import mongoose from "mongoose";

const URL = process.env.MONGO_DB!;

mongoose.connect(URL);
mongoose.connection.once("open", () => {
    console.log(`Connected to mongo database at ${URL}`);
})