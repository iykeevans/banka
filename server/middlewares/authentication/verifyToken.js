import jwt from 'jsonwebtoken';
import { findOne } from '../../models';

// middleware function to check token
// TODO: WRITE TESTS OR THIS
export default async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).json({
        status: 400,
        error: 'Please provide a token',
      });
    } else {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, process.env.SECRET);
      const user = await findOne({ table: 'users', id: decoded.id });
      if (!user) {
        res.status(401).json({
          status: 401,
          error: 'You are not authorized to view this resource',
        });
      } else {
        req.user = { type: user.type, id: decoded.id, isAdmin: decoded.isAdmin };
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
