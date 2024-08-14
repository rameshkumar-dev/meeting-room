import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const token = req.cookies?.authToken;
  console.log('---token    ---- -------', token);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.send({ message: "Unauthorised" });
      }

      req.payload = decoded;
      return next();
    });
  } else {
    return res.send({ message: "Unauthorised" });
  }
};
