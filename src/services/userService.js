import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";


const getAllUsers = async (token) => {
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  const userExist = await User.findById(decode.id);

  // VALIDAMOS PERMISOS - DEBE SER SUPER ADMIN PARA RELIZAR DICHA PETICION
  validateIsSuperAdmin(userExist);

  // SI ES SUPER ADMIN
  const allUsers = await User.find();
  return allUsers;
};

const getOneUser = async (id, token) => {
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  const userExist = await User.findById(decode.id);

  // VALIDAMOS PERMISOS - DEBE SER SUPER ADMIN PARA RELIZAR DICHA PETICION
  validateIsSuperAdmin(userExist);

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

    

    return `User ${data.email} successfully created`;
  } catch (error) {
    throw {
      status: 500,
      message: error?.data || message,
    };
  }
};


const updateOneUser = async (data, token) => {

  // OBTENEMOS USUARIO PARA ACTUALIZAR
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  if(data.password){
    data.password=encryptPassword(data.password)
  }
  
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

const validateIsSuperAdmin = (userExist) => {
  if (!userExist.isSuperAdmin)
    throw {
      status: 400,
      data: `Unauthorized user`,
    };
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
export default {
  getAllUsers,
  getOneUser,
  updateOneUser,
  createNewUser,
  deleteOneUser,
};
