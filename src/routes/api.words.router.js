import express from 'express';
import { Op } from 'sequelize';
import { Word } from '../../db/models';

const apiWordRouter = express.Router();

apiWordRouter.post('/', async (req, res) => {
  const { word } = req.body;
  console.log('word--->', word);

  if (!word) {
    return res.status(400).send('Word is required');
  }
  const words = await Word.findAll({
    where: {
      word: {
        [Op.iLike]: `%${word}%`,
      },
    },
  });
  res.json(words);
});

export default apiWordRouter;
