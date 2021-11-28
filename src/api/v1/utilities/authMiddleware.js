import jwt from "jsonwebtoken";
import { SECRET } from "../../../config";

const authMiddleware = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).send({ error: "token not recogonized" });
  try {
    const user = jwt.verify(token, SECRET);
    if (user) req.user = user;
    next();
  } catch (err) {
    return res.staus(400).send({ error: "Invalid credentials" });
  }
};

export default authMiddleware;
