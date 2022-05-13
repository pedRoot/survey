import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import corsOptions from './config/cors';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';

const app = express();

// config
//
app.disable('x-powered-by');

//middleware
//
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// routes
//
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

// handle errors
//
app.use((error, req, res, next) => {
  console.error('Error: '.error);
  res.status(500).send(error);
});

export default app;
