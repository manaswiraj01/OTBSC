import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';

export const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedobj =  jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { _id } = decodedobj;
    const admin = await Admin.findById(_id);
    if (!admin) {
      throw new Error("Admin not found")
    }
    req.admin = admin;
    next();

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

