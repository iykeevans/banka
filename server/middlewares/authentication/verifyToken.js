import jwt from 'jsonwebtoken';
import { findOne } from '../../models';

// TODO: WRITE TESTS OR THIS
/**
 * @function verifyToken
 * @description function to AUTHENTICATE USER.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @param {object} next - goes to the next task
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports verifyToken
 */
export default async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).json({
        status: 400,
        error: 'Please provide a token',
      });
    } else {
      const token = req.headers.authorization.split(' ')[1];
      const { id, isAdmin } = await jwt.verify(token, process.env.SECRET);
      const { type } = await findOne({ table: 'users', id });
      if (!type) {
        res.status(401).json({
          status: 401,
          error: 'You are not authorized to view this resource',
        });
      } else {
        req.user = { type, id, isAdmin };
        next();
      }
    }
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: error.message,
    });
  }
};
