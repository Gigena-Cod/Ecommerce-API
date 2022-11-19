import userService from "../services/userService.js";

const getAllUsers = async (req, res) => {
  const { token } = req.headers;
  try {
    const allUsers = await userService.getAllUsers(token);
    res.status(200).send({ status: "OK", data: allUsers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.data || error } });
  }
};

const getOneUser = async (req, res) => {
  const { userId } = req.params;
  const { token } = req.headers;

  if (!userId) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error: "Key ID is missing or is empty in request params",
      },
    });
  }

  try {
    const oneUsers = await userService.getOneUser(userId,token);
    res.send({ status: "OK", data: oneUsers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.data || error } });
  }
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

const updateOneUser = async (req, res) => {
  const {
    body,
    headers:{token}
  } = req;
  

  const condition =
    !body?.name &&
    !body?.username &&
    !body?.email &&
    !body?.password &&
    typeof body?.isAdmin !== "boolean";
  if (condition) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of following key is missing or is empty in request: 'id','body'",
      },
    });
  }

  try {
    const updatedUser = await userService.updateOneUser(body,token);
    res.status(201).send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.data || error } });
  }
};

const deleteOneUser = async (req, res) => {
  const {token} = req.headers; 
  try {
    const deletedUser = await userService.deleteOneUser(token);
    res.status(201).send({ status: "OK", data: deletedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.data || error } });
  }
};

export default {
  getAllUsers,
  getOneUser,
  updateOneUser,
  createNewUser,
  deleteOneUser,
};
