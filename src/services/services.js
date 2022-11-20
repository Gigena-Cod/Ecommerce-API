import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const isAuth = async (token) => {
  try {
    // OBTENEMOS USUARIO PARA ANALIZAR TOKENS
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decode.id);

    if (!user.tokens.length) return false;

    let existToken = user.tokens.filter((oldToken) => oldToken.token === token);    
    return existToken.length;

  } catch (error) {
    return false;
  }
};
export default {
  isAuth,
};
