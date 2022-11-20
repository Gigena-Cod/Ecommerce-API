import services from "../services/services.js";

const isAuth = async (req, res, next) => {
    
  const { token } = req.headers;

  if (!token) {
    res
      .status(400)
      .send({ status: "FAILED", data: { error: "No token provider" } });
  } else {
    try {

      let authenticated = await services.isAuth(token);

      authenticated
        ? next()
        : res
            .status(400)
            .send({ status: "FAILED", data: { error: "Unauthenticated" } });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.data || error } });
    }
  }
};

export default {
  isAuth,
};
