import bodyParser from 'body-parser';
import 'dotenv/config';

import { App } from './App';
import AuthenticationController from './authentication/authentication.controller';
import Connection from './interfaces/Connection';
import errorMiddleware from './middleware/error.middleware';
import MongoConnection from './mongo/MongoConnection';

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
    MONGO_URL
} = process.env;
const mongoURL = `${MONGO_PATH}${MONGO_USER}:${MONGO_PASSWORD}${MONGO_URL}`;
const connection: Connection = new MongoConnection(mongoURL);

const app = new App(
    [
        new AuthenticationController('/auth')
    ], 
    [
        bodyParser.json(),
        errorMiddleware
    ], 
    3000, 
    '/api',
    connection
);

app.listen();
