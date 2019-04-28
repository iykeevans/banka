/**
 * @function staffAuth
 * @description function to CHECK IF USER IS A STAFF OR CLIENT.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @param {object} next - goes to the next task
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports cashierAuth
 */
export default async (req, res, next) => {
  const { type, isAdmin } = req.user;
  if (type === 'staff' && isAdmin === false) {
    next();
  } else {
    res.status(401).json({
      status: 401,
      error: 'You must be the cashier to view this resource',
    });
  }
};
