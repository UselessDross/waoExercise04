// src/index.ts
import ordersRouter from './ordersRouter';
import express from 'express';
import './db'; // Import the db.js file

const app = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 8080; // Use 8080 as default port if PORT is not set
const HOST = '0.0.0.0';

// using the ordersRouter file
app.use('/', ordersRouter);

app.listen(port, HOST, () => {
  console.log(`Server is running at http://${HOST}:${port}`);
});
