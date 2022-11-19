import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

/*
OBTENER TODOS LOS USUARIOS
  PERMISOS
    -> TOKEN
    -> SUPERADMIN
*/
const getAllUsers = async (token) => {
  // VALIDAMOS QUE EXISTA EL TOKEN
  if (!token)
    throw {
      status: 400,
      data: `No token provider`,
    };

  // VALIDAMOS PERMISOS - DEBE SER SUPER ADMIN PARA RELIZAR DICHA PETICION
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  const userExist = await User.findById(decode.id);

  if (!userExist.isSuperAdmin)
    throw {
      status: 400,
      data: `Unauthorized user`,
    };

  // SI ES SUPER ADMIN
  const allUsers = await User.find();
  return allUsers;
};

/*
OBTENER UN USUARIO POR ID
  PERMISOS
    -> TOKEN
    -> SUPERADMIN
*/
const getOneUser = async (id, token) => {
  // VALIDAMOS QUE EXISTA EL TOKEN
  if (!token)
    throw {
      status: 400,
      data: `No token provider`,
    };

  // VALIDAMOS PERMISOS - DEBE SER SUPER ADMIN PARA RELIZAR DICHA PETICION
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  const userExist = await User.findById(decode.id);

  if (!userExist.isSuperAdmin)
    throw {
      status: 400,
      data: `Unauthorized user`,
    };

  // BUSCAMOS USUARIO POR ID
  try {
    const oneUsers = await User.findById(id);

    //  SI EL USUARIO NO EXISTE
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

/*
CREAR UN NUEVO USUARIO
*/
const createNewUser = async (data) => {
  // VALIDAMOS SI EL USERNAME ESTA REGISTRADO
  const userExistUsername = await User.findOne({ username: data.username });
  if (userExistUsername)
    throw {
      status: 400,
      data: `User with the username ${data.username} already exist`,
    };

  // VALIDAMOS SI EL EMAIL ESTA REGISTRADO
  const userExistEmail = await User.findOne({ email: data.email });
  if (userExistEmail)
    throw {
      status: 400,
      data: `User with the email ${data.email} already exist`,
    };

  try {
    const newUser = new User(data);

    // ENCRIPTAMOS PASSWORD
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();

    // GENERAMOS TOKEN
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 ,
    });

    return token;
  } catch (error) {
    throw {
      status: 500,
      message: error?.data || message,
    };
  }
};

/*
ACTUALIZAR UN USUARIO
  PERMISOS
    -> TOKEN
  DATA
*/
const updateOneUser = async (data, token) => {
  // VALIDAMOS QUE EXISTA EL TOKEN
  if (!token)
    throw {
      status: 400,
      data: `No token provider`,
    };

  // OBTENEMOS USUARIO PARA ACTUALIZAR
  const decode = jwt.verify(token, process.env.SECRET_KEY);

  try {
    await User.findByIdAndUpdate({ _id: decode.id }, data, {
      new: true,
    });

    return `User ${decode.id} successfully updated`;
  } catch (error) {
    throw {
      status: 500,
      message: error?.data || message,
    };
  }
};

const deleteOneUser = async (token) => {
  // VALIDAMOS QUE EXISTA EL TOKEN
  if (!token)
    throw {
      status: 400,
      data: `No token provider`,
    };

  // OBTENEMOS USUARIO PARA ELIMINAR
  const decode = jwt.verify(token, process.env.SECRET_KEY);

  try {
    User.findByIdAndRemove(decode.id).exec();
    return `User ${decode.id} successfully deleted`;
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
