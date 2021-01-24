import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import episode from './endpoints/eppisode';
import post from './endpoints/post';

import dotenv from 'dotenv'

dotenv.config()

const app = express();

const { 
  PORT = 80, 
  MONGO_CONNECTION_STRING,
} = process.env;

console.log(MONGO_CONNECTION_STRING);

mongoose.connect(MONGO_CONNECTION_STRING as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use('/episode', episode);
app.use('/post', post);

app.listen(PORT, () => 
  console.log(`[SERVER]: Server is running on port ${PORT}`)
);
