import userService from "../services/userService.js";

const getAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsers();
  res.send(allUsers);
};

const getOneUser = async (req, res) => {
  const oneUsers = await userService.getOneUser(req.params.userId);
  res.send({ status: "OK", data: oneUsers });
};

const createNewUser = async (req, res) => {
  const { body } = req;
  const condition =
    !body.name ||
    !body.username ||
    !body.email ||
    !body.password ||
    typeof body.isAdmin !== "boolean";

  if (condition) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of following key is missing or is empty in request body: 'name', 'username', 'email', 'password', 'isAdmin'",
      },
    });
  }

  const newUser = {
    name: body.name,
    username: body.username,
    email: body.email,
    password: body.password,
    isSuperAdmin: false,
    isAdmin: body.isAdmin,
  };

  try {
    const createdUser = await userService.createNewUser(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.data || error } });
  }
};

const updateOneUser = (req, res) => {
  const updatedUser = userService.updateOneUser();
  res.send(`<h1>Update User ${req.params.userId}</h1>`);
};

const deleteOneUser = (req, res) => {
  userService.deleteOneUser();
  res.send(`<h1>Delete User ${req.params.userId}</h1>`);
};

export default {
  getAllUsers,
  getOneUser,
  updateOneUser,
  createNewUser,
  deleteOneUser,
};
