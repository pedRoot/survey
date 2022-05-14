import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import corsOptions from './config/cors';

import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import surveyRoutes from './routes/survey.route';

import { loadDataForModels } from './libs/setupScripts';

const app = express();

// config
//
app.disable('x-powered-by');

//middleware
//
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// Load data for model
//
loadDataForModels();

// routes
//
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/survey', surveyRoutes);
app.get('*', function (req, res) {
  res.status(404).json('location not found');
});

// handle errors
//
app.use((error, req, res, next) => {
  console.error('Error: '.error);
  res.status(500).send(error);
});

export default app;
