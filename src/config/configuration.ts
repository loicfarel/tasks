import { Configuration } from './config.type';

export default (): Configuration => ({
  port: +process.env.PORT || 3003,
  databaseUri: process.env.DB_URI || 'mongodb://localhost:27019/nest-auth',
  apiUrl: process.env.API_URL || 'http://localhost:3003',
  webFrontendUrl: process.env.APP_URL || 'http://localhost:8080',
  maintainer: {
    name: process.env.MAINTAINER_NAME || 'Loic Farel',
    site: process.env.MAINTAINER_SITE || 'https://bento.me/loicfarel',
    email: process.env.MAINTAINER_EMAIL || 'loicfarele@gmail.com',
  },

  jwtSecret: process.env.JWT_SECRET,
  jwtTtl: process.env.JWT_TTL || '1h',
});
