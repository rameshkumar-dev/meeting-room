import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const token = req.cookies?.authToken;

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        req.hasToken = false;
        return next();
      }

      req.hasToken = true;
      next();
    });
  } else {
    req.hasToken = false;
    next();
  }
};
