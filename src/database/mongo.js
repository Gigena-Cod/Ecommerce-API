import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const conectiongString = process.env.MONGO_DB_URI;

const initialConnect = async () => {
  mongoose
    .connect(conectiongString)
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Database Problem with connected"));
};

export default initialConnect;
