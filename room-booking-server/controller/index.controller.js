import jwt from "jsonwebtoken";

export const generateAccessToken = async (req, res) => {
  const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
  const payload = process.env.ACCESS_TOKEN_PAYLOAD;

  if (!req.hasToken) {
    const token = jwt.sign({ payload: payload }, ACCESS_TOKEN_KEY, {
      expiresIn: "1h",
    });

    const config = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    };

    res.cookie("authToken", token, config);

    return res.json({ message: "Token Added" });
  }

  return res.json({ message: "Token Already Present" });
};
