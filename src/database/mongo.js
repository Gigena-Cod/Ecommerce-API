import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const conectiongString = process.env.MONGO_DB_URI;
console.log("🚀 ~ file: mongo.js ~ line 6 ~ conectiongString", conectiongString)

const initialConnect = async () => {
  mongoose
    .connect(conectiongString)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error, "Database Problem with connected"));
};

export default initialConnect;
