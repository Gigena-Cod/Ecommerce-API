import express from "express";
import userControllers from "../../controllers/userController.js"

const v1UserRouter =express.Router()

v1UserRouter
    .get('/',userControllers.getAllUsers)
    .get('/:userId',userControllers.getOneUser)
    .post('/',userControllers.createNewUser)
    .patch('/',userControllers.updateOneUser)
    .delete('/',userControllers.deleteOneUser)

export default v1UserRouter