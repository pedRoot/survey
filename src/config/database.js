import mongoose from 'mongoose';
import conf from './config-env';

mongoose
  .connect(
    `mongodb://${conf.DB_USER}:${conf.DB_PASSWORD}@${conf.DB_HOST}:${conf.DB_PORT}/${conf.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((db) => console.log(`DB is connect :) `))
  .catch((e) => console.log(e));

export default mongoose;
