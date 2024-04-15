import jwt from 'jsonwebtoken';
import 'dotenv/config';

const resLocals = (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next();
  }

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    res.locals.user = user;
    return next();
  } catch (error) {
    next();
  }
};

export default resLocals;
