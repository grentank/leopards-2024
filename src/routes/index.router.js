/**
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */

import express from 'express';
import { Post, User } from '../../db/models';

const indexRouter = express.Router();

indexRouter.get('/', async (req, res) => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
    include: {
      model: User,
      attributes: ['id', 'name', 'email'],
    },
  });
  res.render('MainPage', { posts });
});

export default indexRouter;
