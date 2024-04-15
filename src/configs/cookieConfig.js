import jwtConfig from './jwtConfig';

const cookieConfig = {
  access: {
    maxAge: jwtConfig.access.expiresIn,
    httpOnly: true,
  },
  refresh: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: true,
  },
};

export default cookieConfig;
