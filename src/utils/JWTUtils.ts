import jwt from "jsonwebtoken";

import { UnauthorizedError } from "@/errors";

const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};
const validateToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw new UnauthorizedError(err.message);
    return decoded;
  });
};

export default { generateToken, validateToken };
