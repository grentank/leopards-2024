import express from 'express';
import fs from 'fs/promises';
import sharp from 'sharp';
import { Post } from '../../db/models';
import upload from '../middlewares/multer.middleware';

const apiPostRouter = express.Router();

apiPostRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения постов' });
    }
  })
  .post(upload.single('file'), async (req, res) => {
    const { title, body } = req.body;

    try {
      if (!title || !body) {
        return res.status(400).json({ message: 'Не все поля заполнены' });
      }
      // проверяем наличие файла
      if (!req.file) {
        return res.status(400).json({ message: 'File not found' });
      }

      // создаем имя файла с расширением webp и привязкой к дате
      const name = `${Date.now()}.webp`;
      // создаем буфер с помощью sharp
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();

      // создаем файл с помощью fs
      await fs.writeFile(`./public/img/${name}`, outputBuffer);
      // создаем пост в бд
      const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        img: name,
        userId: res.locals.user.id,
      });

      const newPost = JSON.parse(JSON.stringify(post));
      newPost.User = res.locals.user;
      // отправляем пост
      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка создания поста' });
    }
  });

apiPostRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Пост не найден' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получения поста' });
    }
  })
  .delete(async (req, res) => {
    try {
      const post = await Post.findOne({
        where: {
          id: req.params.id,
          userId: res.locals.user.id,
        },
      });

      if (!post) {
        res.status(401).json({ message: 'Не твой пост не лезь!!' });
        return;
      }
      fs.unlink(`./public/img/${post.img}`).catch((e) => console.log(e));
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
      }
      await post.destroy();
      res.json({ message: 'Post deleted' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default apiPostRouter;
