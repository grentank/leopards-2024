import { WebSocketServer } from 'ws';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

export const wsServer = new WebSocketServer({
  clientTracking: false,
  noServer: true,
});

export const upgradeCb = (request, socket, head) => {
  cookieParser()(request, {}, () => {
    const { refreshToken } = request.cookies;

    socket.on('error', (err) => {
      console.log('Socket error:', err);
    });

    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      socket.removeListener('error', (err) => {
        console.log('Socket error:', err);
      });

      wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
      });
    } catch (e) {
      console.log(e);
      socket.close();
    }
  });
};
