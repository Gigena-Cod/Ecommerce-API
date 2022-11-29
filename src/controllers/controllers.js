import services from "../services/services.js";

let DefaultMessageError = (error) => ({
  status: "FAILED",
  data: { error: error?.data || error },
});

let UnauthenticatedMessageError = {
  status: "FAILED",
  data: { error: "Unauthenticated" },
};

let MissingKeysMessageError = {
  status: "FAILED",
  data: {
    error:
      "One of following key is missing or is empty in request body: 'email', 'password",
  },
};
let MissingTokenMessageError = {
  status: "FAILED",
  data: { error: "No token provider" },
};

const isAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    res.status(400).send(MissingTokenMessageError);
  } else {
    try {
      let authenticated = await services.isAuth(token);

      authenticated
        ? next()
        : res.status(400).send(UnauthenticatedMessageError);
    } catch (error) {
      res.status(error?.status || 500).send(DefaultMessageError(error));
    }
  }
};

const isNotAuth = async (req, res, next) => {
  const { email } = req.body;
  const condition = !email || !password;

  if (condition) return res.status(400).send(MissingKeysMessageError);

  try {
    let authenticated = await services.isNotAuth(email);

    authenticated ? next() : res.status(400).send(UnauthenticatedMessageError);
  } catch (error) {
    res.status(error?.status || 500).send(DefaultMessageError(error));
  }
};
export default {
  isAuth,
  isNotAuth,
};
