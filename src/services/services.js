import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const isAuth = async (token) => {
  try {
    // OBTENEMOS USUARIO PARA ANALIZAR TOKENS
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decode.id);

    if (user.token==="") return false;

    return true;
  } catch (error) {
    return false;
  }
};

const isNotAuth = async (email) => {
  try {
    
    const user = await User.find(email);

    if (!user?.token) return false;

    return true;
  } catch (error) {
    return false;
  }
};
export default {
  isAuth,
  isNotAuth
};
