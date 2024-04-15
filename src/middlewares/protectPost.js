const protectPost = (req, res, next) => {
  if (!res.locals.user) {
    return res.status(401).json({ message: ' Не авторизован' });
  }

  next();
};

export default protectPost;
