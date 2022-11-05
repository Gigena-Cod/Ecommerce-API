import userService from "../services/userService.js";

const getAllUsers = (req, res) => {
  const allUsers = userService.getAllUsers();
  res.send("<h1>ALL USERS</h1>");
};

const getOneUser = (req, res) => {
  const oneUsers = userService.getOneUser(req.params.userId);
  res.send({ status: "OK", data: [] });
};

const createNewUser = (req, res) => {
  const createdUser = userService.createNewUser(req.params.userId);
  res.send(`<h1>Create User ${req.params.userId}</h1>`);
};

const updateOneUser = (req, res) => {
  const updatedUser = userService.updateOneUser(req.params.userId);
  res.send(`<h1>Update User ${req.params.userId}</h1>`);
};

const deleteOneUser = (req, res) => {
  userService.deleteOneUser(req.params.userId);
  res.send(`<h1>Delete User ${req.params.userId}</h1>`);
};

export default {
  getAllUsers,
  getOneUser,
  updateOneUser,
  createNewUser,
  deleteOneUser,
};
