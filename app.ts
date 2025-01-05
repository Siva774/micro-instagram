import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/database';
import router from './routes/index';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api', router);

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
