import express from 'express';
import 'dotenv/config';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import indexRouter from './routes/index.router';
import jsxRender from './utils/jsxRender';
import apiPostRouter from './routes/api.post.router';
import apiAuthRouter from './routes/api.auth.router';
import resLocals from './middlewares/resLocals';
import protectPost from './middlewares/protectPost';
import testRouter from './routes/test.router';
import apiWordRouter from './routes/api.words.router';
import { upgradeCb, wsServer } from './ws/wsServer';
import connectionCb from './ws/connection';

const app = express();
app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components', 'pages'));

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(resLocals);

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/api/words', apiWordRouter);
app.use('/api/posts', protectPost, apiPostRouter);
app.use('/api/auth/', apiAuthRouter);

const server = createServer(app);

server.on('upgrade', upgradeCb);
wsServer.on('connection', connectionCb);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
