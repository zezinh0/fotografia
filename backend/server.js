import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import gruposRouter from './routes/grupoRoutes.js';
import imagensRouter from './routes/imagenssRoutes.js';
import clientRouter from './routes/clientRoutes.js';
import encomendaRouter from './routes/encomendaRoutes.js';
import Stripe from 'stripe';

const app = express();
app.use(fileUpload());
dotenv.config();

app.use('/api/seed', seedRouter);
app.use('/api/grupos', gruposRouter);
app.use('/api/imagens', imagensRouter);
app.use('/api/client', clientRouter);
app.use('/api/encomenda', encomendaRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(5000, () => console.log('Server Started...'));
