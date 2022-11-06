import mongoose from "mongoose";
import User from "../models/UserModel.js";

const getAllUsers = async () => {
  const allUsers = await User.find(); 
  mongoose.connection.close();
  
  return allUsers;
};
const getOneUser = async () => {
  return allUsers;
};
const updateOneUser = () => {
  return;
};
const createNewUser = () => {
  return;
};
const deleteOneUser = () => {
  return;
};

export default {
  getAllUsers,
  getOneUser,
  updateOneUser,
  createNewUser,
  deleteOneUser,
};
