import mongoose from "mongoose";
import User from "../models/UserModel.js";

const getAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

const getOneUser = async (id) => {
  try {
    const oneUsers = await User.findById(id);

    if (!oneUsers)
      throw {
        status: 400,
        data: `User with the id ${id} not exist`,
      };

    return oneUsers;
  } catch (error) {
    throw {
      status: 500,
      message: error?.data || data,
    };
  }
};

const createNewUser = async (data) => {
  const userExistUsername = await User.findOne({ username: data.username });
  if (userExistUsername)
    throw {
      status: 400,
      data: `User with the username ${data.username} already exist`,
    };

  const userExistEmail = await User.findOne({ email: data.email });
  if (userExistEmail)
    throw {
      status: 400,
      data: `User with the email ${data.email} already exist`,
    };

  try {
    const newUser = new User(data);
    newUser.save();
    return `User ${data.username} successfully created`;
  } catch (error) {
    throw {
      status: 500,
      message: error?.data || message,
    };
  }
};

const updateOneUser = () => {
  return;
};

const deleteOneUser = async (id) => {
  const userExist = await User.findById(id);
  
  if (!userExist)
    throw {
      status: 400,
      data: `User with the id ${id} not exist`,
    };
    
  try {
    User.findByIdAndRemove(id).exec();
    return `User ${id} successfully deleted`;
    
  } catch (error) {
    throw {
      status: 500,
      message: error?.data || message,
    };
  }
};

export default {
  getAllUsers,
  getOneUser,
  updateOneUser,
  createNewUser,
  deleteOneUser,
};
