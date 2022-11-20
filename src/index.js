import express from "express";
import cors from "cors";
import morgan from "morgan"; 
import initialConnect from './database/mongo.js'
import middlewares from "./middlewares/index.js";
import v1UserRouter from "./v1/routes/userRoutes.js";
import v1AuthRouter from "./v1/routes/authRoutes.js";


initialConnect()

const app = express();
app.use(morgan('tiny'))
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/sesion", v1AuthRouter);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

app.use(middlewares.notFound);
