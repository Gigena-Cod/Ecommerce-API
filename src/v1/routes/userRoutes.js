import express from "express";
import userControllers from "../../controllers/userController.js"

const v1UserRouter =express.Router()

v1UserRouter
    .get('/',userControllers.getAllUsers)
    .get('/:userId',userControllers.getOneUser)
    .post('/:userId',userControllers.createNewUser)
    .patch('/:userId',userControllers.updateOneUser)
    .delete('/:userId',userControllers.deleteOneUser)

export default v1UserRouter