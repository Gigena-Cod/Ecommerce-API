import express from "express";
import v1UserRouter from "./v1/routes/userRoutes.js";
import middlewares from "./middlewares/index.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/users", v1UserRouter);

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

app.use(middlewares.notFound);
app.use(cors());
