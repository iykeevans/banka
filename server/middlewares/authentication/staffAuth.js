export default async (req, res, next) => {
  const { type } = req.user;
  try {
    if (type === 'staff') {
      next();
    } else {
      res.status(401).json({
        status: 401,
        error: 'You are now allowed to view this resource',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
