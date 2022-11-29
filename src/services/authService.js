import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const signInAuth = async (email, password) => {
  // VALIDAR SI EL USUARIO EXISTE
  const userExist = await User.findOne({ email: email });

  if (!userExist)
    throw {
      status: 400,
      data: `The e-mail ${email} is not registered`,
    };

  // VALIDAMOS CONTRASEÑA

  const valid = await userExist.validatePassword(password);

  if (!valid)
    throw {
      status: 400,
      data: `The password is invalid`,
    };

  const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
    expiresIn: 3600,
  });
  try {
    await User.findByIdAndUpdate(userExist.id, {
      token,
    });

    return token;
  } catch (error) {
    throw {
      status: 500,
      message: error?.data || message,
    };
  }
};

const signOutAuth = async (token) => {
  // OBTENEMOS USUARIO PARA ANALIZAR TOKENS
  const decode = jwt.verify(token, process.env.SECRET_KEY);

  try {
    await User.findByIdAndUpdate(decode.id, { token: "" });
    return `Sign out successfully`;
  } catch (error) {
    throw {
      status: 500,
      message: error?.data || message,
    };
  }
};
export default {
  signInAuth,
  signOutAuth,
};
