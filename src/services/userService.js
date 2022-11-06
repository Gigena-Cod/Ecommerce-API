import mongoose from "mongoose";
import User from "../models/UserModel.js";

const getAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

const getOneUser = async (id) => {
  return;
};

const createNewUser = async (data) => {
  const userExistUsername = await User.findOne({ username: data.username });
  if (userExistUsername)
    throw {
      status: 400,
      message: `User with the username ${data.username} already exist`,
    };

  const userExistEmail = await User.findOne({ email: data.email });
  if (userExistEmail)
    throw {
      status: 400,
      message: `User with the email ${data.email} already exist`,
    };

  try {
    const newUser = new User(data);
    newUser.save();
    return `User ${data.username} successfully created`;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || message,
    };
  }
};

const updateOneUser = () => {
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
