import express from "express";
import authControllers from "../../controllers/authController.js"

const v1AuthRouter = express.Router()

v1AuthRouter
    //LOGIN
    .post('/',authControllers.signInAuth)

export default v1AuthRouter