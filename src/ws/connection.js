import jwt from 'jsonwebtoken';
import { Post, User } from '../../db/models';
import 'dotenv/config';

const connections = new Map(); // хранит все текущие соединения по WS

const connectionCb = (socket, request) => {
  const { refreshToken } = request.cookies;
  const { id, name, email } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = { id, name, email };

  connections.set(user.id, { user, ws: socket });

  connections.forEach(({ ws }) => {
    const allUsers = [...connections.values()].map((val) => val.user.name);
    const action = {
      type: 'SET_ONLINE_USERS',
      payload: allUsers,
    };
    ws.send(JSON.stringify(action));
  });

  console.log('user has connected', user);
  // map.set(userFromJWT.id, { ws: socket, user: userFromJWT });

  socket.on('error', console.error);

  socket.on('close', () => {
    connections.delete(user.id);
    connections.forEach(({ ws }) => {
      const allUsers = [...connections.values()].map((val) => val.user.name);
      const action = {
        type: 'SET_ONLINE_USERS',
        payload: allUsers,
      };
      ws.send(JSON.stringify(action));
    });
  });

  socket.on('message', async (data) => {
    const action = JSON.parse(data);
    const { type, payload } = action;

    switch (type) {
      case 'CREATE_POST':
        Post.findOne({ where: { id: payload }, include: User }).then((newPost) => {
          connections.forEach(({ user: wsUser, ws }) => {
            if (wsUser.id === user.id) return;
            const actionAdd = {
              type: 'ADD_POST',
              payload: newPost,
            };
            ws.send(JSON.stringify(actionAdd));
          });
        });
        break;
      case 'DELETE_POST':
        Post.destroy({ where: { id: payload } }).then(() => {
          connections.forEach(({ ws }) => {
            const removeAction = {
              type: 'REMOVE_POST',
              payload,
            };
            ws.send(JSON.stringify(removeAction));
          });
        });

      default:
        break;
    }
  });

  // map.forEach(({ ws }) => {
  //   ws.send(
  //     JSON.stringify({
  //       type: SET_USERS_FROM_SERVER,
  //       payload: [...map.values()].map(({ user }) => user),
  //     }),
  //   );
  // });

  // socket.on('message', async (message) => {
  //   const { type, payload } = JSON.parse(message); // получили сообщение с клиента
  //   switch (type) {
  //     case ADD_MESSAGE_FROM_CLIENT: {
  //       Message.create({ text: payload, authorId: userFromJWT.id }).then(async (newMessage) => {
  //         const includedMessage = await Message.findOne({
  //           where: { id: newMessage.id },
  //           include: User,
  //         });
  //         map.forEach(({ ws }) => {
  //           ws.send(
  //             JSON.stringify({
  //               type: ADD_MESSAGE_FROM_SERVER,
  //               payload: includedMessage,
  //             }),
  //           );
  //         });
  //       });
  //       break;
  //     }

  //     case TYPING_MESSAGE_FROM_CLIENT: {
  //       map.forEach(({ ws }) => {
  //         ws.send(
  //           JSON.stringify({
  //             type: TYPING_MESSAGE_FROM_SERVER,
  //           }),
  //         );
  //       });
  //       break;
  //     }

  //     case STOP_TYPING_MESSAGE_FROM_CLIENT: {
  //       map.forEach(({ ws }) => {
  //         ws.send(
  //           JSON.stringify({
  //             type: STOP_TYPING_MESSAGE_FROM_SERVER,
  //           }),
  //         );
  //       });
  //       break;
  //     }

  //     default:
  //       break;
  //   }
  //   console.log(`Received message ${message} from user ${userFromJWT.id}`);
  // });

  // socket.on('close', () => {
  //   map.delete(userFromJWT.id);
  //   map.forEach(({ ws }) => {
  //     ws.send(
  //       JSON.stringify({
  //         type: SET_USERS_FROM_SERVER,
  //         payload: [...map.values()].map(({ user }) => user),
  //       }),
  //     );
  //   });
  // });
};

export default connectionCb;
