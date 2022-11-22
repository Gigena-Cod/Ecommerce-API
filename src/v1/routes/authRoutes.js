import express from "express";
import controllers from "../../controllers/controllers.js";
import authControllers from "../../controllers/authController.js"

const v1AuthRouter = express.Router()

v1AuthRouter
    //LOGIN
    .post('/signin',authControllers.signInAuth)
    //LOGOUT
    .post('/signout',controllers.isAuth,authControllers.signOutAuth)
    //VALIDATE SESION
    .post('/validate',controllers.isAuth)

export default v1AuthRouter