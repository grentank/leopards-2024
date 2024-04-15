import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';
import generateToken from '../utils/generateToken';
import cookieConfig from '../configs/cookieConfig';

const apiAuthRouter = express.Router();

apiAuthRouter.post('/signup', async (req, res) => {
  const { password, name, email } = req.body;

  if (!password || !email || !name) {
    res.status(401).json({ message: 'Не все поля заполнены' });
    return;
  }

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      password: await bcrypt.hash(password, 11),
    },
  });

  if (!created) {
    res.status(401).json({ message: 'Пользователь уже существует' });
    return;
  }

  const plainUser = { id: user.id, name: user.name, email: user.email };

  const { accessToken, refreshToken } = generateToken(plainUser);

  res
    .cookie('accessToken', accessToken, cookieConfig.access)
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .sendStatus(200);
});

apiAuthRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).json({ message: "User doesn't exist" });

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const plainUser = user.get();
  delete plainUser.password;

  const { accessToken, refreshToken } = generateToken(plainUser);

  res
    .cookie('accessToken', accessToken, cookieConfig.access)
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .sendStatus(200);
});

apiAuthRouter.get('/logout', (req, res) => {
  res.clearCookie('accessToken').clearCookie('refreshToken').sendStatus(200);
});

export default apiAuthRouter;
