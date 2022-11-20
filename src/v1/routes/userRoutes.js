import express from "express";
import controllers from "../../controllers/controllers.js";
import userControllers from "../../controllers/userController.js";

const v1UserRouter = express.Router();

v1UserRouter
  .get("/", controllers.isAuth, userControllers.getAllUsers)
  .get("/:userId", controllers.isAuth, userControllers.getOneUser)
  .post("/", userControllers.createNewUser)
  .patch("/", controllers.isAuth, userControllers.updateOneUser)
  .delete("/", controllers.isAuth, userControllers.deleteOneUser);

export default v1UserRouter;
