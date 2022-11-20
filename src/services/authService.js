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

  // ELIMINAR TOKENS EXPIRADOS
  let oldTokens = userExist.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((token) => {
      const timeDiff = (Date.now() - parseInt(token.signedAt)) / 1000;
      if (timeDiff < 3600) return token;
    });
  }

  // GUARDAMOS NUEVO TOKEN EN USUARIO
  const newToken = {
    token,
    signedAt: Date.now().toString(),
  };

  try {
    await User.findByIdAndUpdate(userExist.id, {
      tokens: [...oldTokens, newToken],
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
  const user = await User.findById(decode.id);

  const newTokens = user.tokens.filter((oldToken) => oldToken.token !== token); 

  try {
    await User.findByIdAndUpdate(decode.id, { tokens: newTokens });
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
