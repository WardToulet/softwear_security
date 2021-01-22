import express from 'express';

import test from './endpoints/test';

const app = express();
const PORT = 8080;

app.get('/', (_req, res) => res.send('Helo world'));

app.use('/test', test);

app.listen(PORT, () => 
  console.log(`[SERVER]: Server is running on port ${PORT}`)
);

