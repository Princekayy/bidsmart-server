import jwt from "jsonwebtoken";

export const generateToken = async (payload) => {
    return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export const verifyToken = async (token) => {
    const response =  await jwt.verify(token, process.env.JWT_SECRET);
    return response;
}