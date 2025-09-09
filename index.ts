import express, { Express } from 'express'
import * as database from './config/database'
import dotenv from 'dotenv'
import cors from 'cors' 
import mainV1Router from './api/v1/routers/index.router';

dotenv.config();

database.connect();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mainV1Router(app);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});