import { verifyToken } from "../utils/token.js";

export const authMiddleware = async (req, res, next) => {
  let token;
 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = await verifyToken(token);

      req.user = decoded;
      next(); 
    } catch (error) {
      console.log(error)
      return res.status(401).json({ success: false, message: error.message });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};
