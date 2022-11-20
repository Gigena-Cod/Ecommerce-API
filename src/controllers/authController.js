import authService from "../services/authService.js";

const signInAuth = async (req, res) => {
  const { email, password } = req.body;
  const condition = !email || !password;

  if (condition) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of following key is missing or is empty in request body: 'email', 'password",
      },
    });
  }

  try {
    const token = await authService.signInAuth(email, password);
    res.status(200).send({ status: "OK", data: token });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.data || error } });
  }
};

const signOutAuth = async (req, res) => {
  const { token } = req.headers;

  try {
    let result = await authService.signOutAuth(token);
    res.status(200).send({ status: "OK", data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.data || error } });
  }
};

const validateToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    res
      .status(400)
      .send({ status: "FAILED", data: { error: "No token provider" } });
  }else{
    next()
  }
};

export default {
  signInAuth,
  signOutAuth,
  validateToken,
};
