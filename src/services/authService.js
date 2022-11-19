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
    expiresIn: 60 * 60 * 0.5,
  });
  return token;
};


export default {
  signInAuth
};
